import {
  ComponentLink,
  ComponentLinkDefinition,
} from 'leto-modelizer-plugin-core';

export default [
  new ComponentLink({
    source: 'id_2',
    target: 'id_1',
    definition: new ComponentLinkDefinition({
      attributeRef: 'toChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Default',
      linkAttribute: 'name',
    }),
  }),
];
