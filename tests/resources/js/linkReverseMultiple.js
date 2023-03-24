import {
  ComponentLink,
  ComponentLinkDefinition,
} from 'leto-modelizer-plugin-core';

export default [
  new ComponentLink({
    source: 'parent_reverse_multiple_1',
    target: 'child_reverse_multiple_1',
    definition: new ComponentLinkDefinition({
      attributeRef: 'fromChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Reverse',
    }),
  }),
  new ComponentLink({
    source: 'parent_reverse_multiple_1',
    target: 'child_reverse_multiple_2',
    definition: new ComponentLinkDefinition({
      attributeRef: 'fromChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Reverse',
    }),
  }),
];
