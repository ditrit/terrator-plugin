export default {
  $id: 'https://ditrit.io/schemas',
  type: 'object',
  properties: {
    name: { type: 'string' },
    model: { type: 'string' },
    icon: { type: 'string' },
    attributes: { type: 'array', items: { $ref: '#/definitions/attribute' } },
    data: { type: 'array', items: { $ref: '#/definitions/data' } },
    modules: { type: 'array', items: { $ref: '#/definitions/module' } },
    resources: { type: 'array', items: { $ref: '#/definitions/resource' } },
    variables: { type: 'array', items: { $ref: '#/definitions/variable' } },
  },
  required: ['name', 'attributes', 'data', 'modules', 'resources', 'variables'],
  definitions: {
    defaultObject: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        model: { type: 'string' },
        icon: { type: 'string' },
        isContainer: { type: 'boolean' },
        attributes: { type: 'array', items: { $ref: '#/definitions/attribute' } },
      },
      required: ['type', 'attributes'],
    },
    attribute: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: {
          type: 'string',
          pattern: '(String|Boolean|Number|Array|Object|Link|Reference)',
        },
        required: { type: 'boolean' },
        linkType: {
          type: 'string',
          pattern: '(Default|Reverse)',
        },
        linkRef: { type: 'string' },
        containerRef: { type: 'string' },
        attributes: { type: 'array', items: { $ref: '#/definitions/attribute' } },
        rules: { $ref: '#/definitions/rule' },
      },
      required: ['name', 'type'],
    },
    rule: {
      type: 'object',
      properties: {
        values: { type: 'array', items: { type: 'string' } },
        min: { type: 'integer' },
        max: { type: 'integer' },
        regex: { type: 'string' },
      },
    },
    data: {
      $ref: '#/definitions/defaultObject',
    },
    module: {
      $ref: '#/definitions/defaultObject',
    },
    resource: {
      $ref: '#/definitions/defaultObject',
    },
    variable: {
      $ref: '#/definitions/defaultObject',
    },
  },
};
