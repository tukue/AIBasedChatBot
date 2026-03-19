const yaml = require('js-yaml');

const passthroughType = (tag, key) =>
  new yaml.Type(tag, {
    kind: 'scalar',
    construct: data => ({ [key]: data })
  });

const sequenceType = (tag, key) =>
  new yaml.Type(tag, {
    kind: 'sequence',
    construct: data => ({ [key]: data })
  });

const mappingType = (tag, key) =>
  new yaml.Type(tag, {
    kind: 'mapping',
    construct: data => ({ [key]: data })
  });

const cloudFormationSchema = yaml.DEFAULT_SCHEMA.extend([
  passthroughType('!Ref', 'Ref'),
  passthroughType('!Sub', 'Fn::Sub'),
  passthroughType('!GetAtt', 'Fn::GetAtt'),
  sequenceType('!GetAtt', 'Fn::GetAtt'),
  sequenceType('!Sub', 'Fn::Sub'),
  mappingType('!Sub', 'Fn::Sub')
]);

function loadCloudFormationYaml(content) {
  return yaml.load(content, { schema: cloudFormationSchema });
}

module.exports = {
  loadCloudFormationYaml
};
