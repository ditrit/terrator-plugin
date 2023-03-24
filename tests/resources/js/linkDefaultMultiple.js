import {
  ComponentLink,
  ComponentLinkDefinition,
} from 'leto-modelizer-plugin-core';

export default [
  new ComponentLink({
    source: 'parent_default_multiple_1',
    target: 'child_default_multiple_1',
    definition: new ComponentLinkDefinition({
      attributeRef: 'toChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Default',
    }),
  }),
  new ComponentLink({
    source: 'parent_default_multiple_1',
    target: 'child_default_multiple_2',
    definition: new ComponentLinkDefinition({
      attributeRef: 'toChild',
      sourceRef: 'parent',
      targetRef: 'child',
      type: 'Default',
    }),
  }),
];
