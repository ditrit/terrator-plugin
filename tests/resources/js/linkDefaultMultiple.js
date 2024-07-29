import {
  ComponentLink,
  ComponentLinkDefinition,
} from 'leto-modelizer-plugin-core';

export default [
  new ComponentLink({
    source: 'id_1',
    target: 'id_2',
    definition: new ComponentLinkDefinition({
      attributeRef: 'toChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Default',
    }),
  }),
  new ComponentLink({
    source: 'id_1',
    target: 'id_3',
    definition: new ComponentLinkDefinition({
      attributeRef: 'toChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Default',
      linkAttribute: 'name',
    }),
  }),
];
