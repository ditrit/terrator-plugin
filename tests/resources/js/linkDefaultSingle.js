import {
  ComponentLink,
  ComponentLinkDefinition,
} from 'leto-modelizer-plugin-core';

export default [
  new ComponentLink({
    source: 'parent_default_single_1',
    target: 'child_default_single_1',
    definition: new ComponentLinkDefinition({
      attributeRef: 'toChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Default',
    }),
  }),
];
