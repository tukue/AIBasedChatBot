const fs = require('fs');
const path = require('path');

// Read the CloudFormation template as plain text
const templateFile = process.argv[2] || 'template-simplified.yaml';
const template = fs.readFileSync(templateFile, 'utf8');

// Extract resources using regex
const resourceSection = template.match(/Resources:([\s\S]*?)(?:Outputs:|$)/)[1];
const resourceMatches = resourceSection.matchAll(/\s\s(\w+):\s*\n\s+Type:\s+([\w:]+)/g);

// Build resource map
const resources = {};
for (const match of resourceMatches) {
  resources[match[1]] = { name: match[1], type: match[2] };
}

// Find connections
const connections = [];

// Find Ref connections
const refMatches = template.matchAll(/!Ref\s+(\w+)/g);
for (const match of refMatches) {
  const targetName = match[1];
  if (resources[targetName]) {
    // Find the resource that contains this reference
    const beforeRef = template.substring(0, match.index);
    const lastResourceStart = beforeRef.lastIndexOf('  ');
    if (lastResourceStart > 0) {
      const resourceSection = beforeRef.substring(lastResourceStart);
      const resourceMatch = resourceSection.match(/\s\s(\w+):/);
      if (resourceMatch && resourceMatch[1] !== targetName) {
        connections.push({
          from: resourceMatch[1],
          to: targetName,
          type: 'Ref'
        });
      }
    }
  }
}

// Find GetAtt connections
const getAttMatches = template.matchAll(/!GetAtt\s+(\w+)\.(\w+)/g);
for (const match of getAttMatches) {
  const targetName = match[1];
  const attribute = match[2];
  if (resources[targetName]) {
    // Find the resource that contains this reference
    const beforeGetAtt = template.substring(0, match.index);
    const lastResourceStart = beforeGetAtt.lastIndexOf('  ');
    if (lastResourceStart > 0) {
      const resourceSection = beforeGetAtt.substring(lastResourceStart);
      const resourceMatch = resourceSection.match(/\s\s(\w+):/);
      if (resourceMatch && resourceMatch[1] !== targetName) {
        connections.push({
          from: resourceMatch[1],
          to: targetName,
          type: 'GetAtt',
          attribute: attribute
        });
      }
    }
  }
}

// Generate ASCII diagram
console.log('Service Interactions:');
console.log('====================');

// Filter out duplicate connections
const uniqueConnections = connections.filter((conn, index, self) => 
  index === self.findIndex(c => c.from === conn.from && c.to === conn.to)
);

uniqueConnections.forEach(conn => {
  if (resources[conn.from] && resources[conn.to]) {
    const fromType = resources[conn.from].type.split('::')[1];
    const toType = resources[conn.to].type.split('::')[1];
    console.log(`${fromType} (${conn.from}) --[${conn.type}${conn.attribute ? '.' + conn.attribute : ''}]--> ${toType} (${conn.to})`);
  }
});

// Print summary of services
console.log('\nServices Summary:');
console.log('================');

const serviceTypes = {};
Object.values(resources).forEach(resource => {
  serviceTypes[resource.type] = (serviceTypes[resource.type] || 0) + 1;
});

Object.keys(serviceTypes).sort().forEach(type => {
  console.log(`${type}: ${serviceTypes[type]}`);
});