const randomString = {
  type: 'random_string',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'Random String',
  description: 'Generates a random permutation of alphanumeric characters and optionally special characters.',
  icon: 'variable',
  model: 'DefaultModel',
  url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string',
  categories: ['AWS', 'Miscellaneous'],
  tags: [],
  definedAttributes: [
    {
      name: 'length',
      displayName: 'Length',
      description: 'The length of the string desired.',
      required: true,
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string#length',
      rules: {
        min: 1,
      },
    },
    {
      name: 'special',
      displayName: 'Special',
      description: 'Include special characters in the result.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string#special',
    },
    {
      name: 'min_special',
      displayName: 'Min special',
      description: 'Minimum number of special characters to include in the result.',
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string#min_special',
    },
    {
      name: 'lower',
      displayName: 'Lower',
      description: 'Include lowercase alphabet characters in the result.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string#lower',
    },
    {
      name: 'min_lower',
      displayName: 'Min lower',
      description: 'Minimum number of lowercase characters to include in the result.',
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string#min_lower',
    },
    {
      name: 'upper',
      displayName: 'Upper',
      description: 'Include uppercase alphabet characters in the result.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string#upper',
    },
    {
      name: 'min_upper',
      displayName: 'Min upper',
      description: 'Minimum number of uppercase characters to include in the result.',
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string#min_upper',
    },
    {
      name: 'numeric',
      displayName: 'Numeric',
      description: 'Include numeric characters in the result.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string#numeric',
    },
    {
      name: 'min_numeric',
      displayName: 'Min numeric',
      description: 'Minimum number of numeric characters to include in the result.',
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password#min_numeric',
    },
    {
      name: 'override_special',
      displayName: 'Override special',
      description: 'Supply your own list of special characters to use for string generation.',
      type: 'String',
    },
  ],
};

const randomPassword = {
  type: 'random_password',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'Random Password',
  description: 'Identical to random_string with the exception that the result is treated as sensitive and, thus, not displayed in console output.',
  icon: 'variable',
  model: 'DefaultModel',
  url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password',
  categories: ['AWS', 'Miscellaneous'],
  tags: [],
  definedAttributes: [
    {
      name: 'length',
      displayName: 'Length',
      description: 'The length of the string desired.',
      required: true,
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password#length',
      rules: {
        min: 1,
      },
    },
    {
      name: 'special',
      displayName: 'Special',
      description: 'Include special characters in the result.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password#special',
    },
    {
      name: 'min_special',
      displayName: 'Min special',
      description: 'Minimum number of special characters to include in the result.',
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string#min_special',
    },
    {
      name: 'lower',
      displayName: 'Lower',
      description: 'Include lowercase alphabet characters in the result.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password#lower',
    },
    {
      name: 'min_lower',
      displayName: 'Min lower',
      description: 'Minimum number of lowercase characters to include in the result.',
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string#min_lower',
    },
    {
      name: 'upper',
      displayName: 'Upper',
      description: 'Include uppercase alphabet characters in the result.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password#upper',
    },
    {
      name: 'min_upper',
      displayName: 'Min upper',
      description: 'Minimum number of uppercase characters to include in the result.',
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/string#min_upper',
    },
    {
      name: 'numeric',
      displayName: 'Numeric',
      description: 'Include numeric characters in the result.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password#numeric',
    },
    {
      name: 'min_numeric',
      displayName: 'Min numeric',
      description: 'Minimum number of numeric characters to include in the result.',
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password#min_numeric',
    },
    {
      name: 'override_special',
      displayName: 'Override special',
      description: 'Supply your own list of special characters to use for string generation.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/password#override_special',
    },
  ],
};

export default [
  randomString,
  randomPassword,
];
