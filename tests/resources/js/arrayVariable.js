import TerraformVariable from 'src/models/TerraformVariable';

export default [
  new TerraformVariable({
    name: 'test_local_string',
    value: ['a', 'b', 'c'],
    category: 'local',
    path: 'new_file.tf',
    type: 'list(string)',
  }),
  new TerraformVariable({
    name: 'test_local_number',
    value: [1, 2, 3],
    category: 'local',
    path: 'new_file.tf',
    type: 'list(number)',
  }),
  new TerraformVariable({
    name: 'test_local_bool',
    value: [true, false, true],
    category: 'local',
    path: 'new_file.tf',
    type: 'list(bool)',
  }),
  new TerraformVariable({
    name: 'test_variable_string',
    defaultValue: ['a', 'b', 'c'],
    type: 'list(string)',
    path: 'new_file.tf',
    category: 'variable',
  }),
  new TerraformVariable({
    name: 'test_variable_number',
    defaultValue: [1, 2, 3],
    type: 'list(number)',
    path: 'new_file.tf',
    category: 'variable',
  }),
  new TerraformVariable({
    name: 'test_variable_bool',
    defaultValue: [true, false, true],
    type: 'list(bool)',
    path: 'new_file.tf',
    category: 'variable',
  }),
  new TerraformVariable({
    name: 'test_output_string',
    value: ['a', 'b', 'c'],
    category: 'output',
    path: 'new_file.tf',
    type: 'list(string)',
  }),
  new TerraformVariable({
    name: 'test_output_number',
    value: [1, 2, 3],
    category: 'output',
    path: 'new_file.tf',
    type: 'list(number)',
  }),
  new TerraformVariable({
    name: 'test_output_bool',
    value: [true, false, true],
    category: 'output',
    path: 'new_file.tf',
    type: 'list(bool)',
  }),
];
