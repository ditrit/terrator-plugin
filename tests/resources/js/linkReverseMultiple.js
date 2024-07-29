import {
  ComponentLink,
  ComponentLinkDefinition,
} from 'leto-modelizer-plugin-core';

export default [
  new ComponentLink({
    source: 'id_1',
    target: 'id_2',
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
    source: 'id_1',
    target: 'id_3',
    isReverse: true,
    definition: new ComponentLinkDefinition({
      attributeRef: 'fromChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Reverse',
    }),
  }),
];
