import {
  ComponentLink,
  ComponentLinkDefinition,
} from 'leto-modelizer-plugin-core';

export default [
  new ComponentLink({
    source: 'id_3',
    target: 'id_1',
    isReverse: true,
    definition: new ComponentLinkDefinition({
      attributeRef: 'fromChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Reverse',
      linkAttribute: 'name',
    }),
  }),
  new ComponentLink({
    source: 'id_3',
    target: 'id_2',
    isReverse: true,
    definition: new ComponentLinkDefinition({
      attributeRef: 'fromChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Reverse',
    }),
  }),
];
