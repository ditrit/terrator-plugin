import {
  ComponentLink,
  ComponentLinkDefinition,
} from 'leto-modelizer-plugin-core';

export default [
  new ComponentLink({
    source: 'id_2',
    target: 'id_1',
    definition: new ComponentLinkDefinition({
      attributeRef: 'fromChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Reverse',
      linkAttribute: 'name',
    }),
  }),
];
