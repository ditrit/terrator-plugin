import {
  ComponentLink,
  ComponentLinkDefinition,
} from '@ditrit/leto-modelizer-plugin-core';

export default [
  new ComponentLink({
    source: 'id_1',
    target: 'id_2',
    definition: new ComponentLinkDefinition({
      attributeRef: 'toChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Default',
      linkAttribute: 'name',
    }),
  }),
];
