import {
  ComponentLink,
  ComponentLinkDefinition,
} from 'leto-modelizer-plugin-core';

export default [
  new ComponentLink({
    source: 'parent_reverse_single_1',
    target: 'child_reverse_single_1',
    definition: new ComponentLinkDefinition({
      attributeRef: 'fromChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Reverse',
    }),
  }),
];
