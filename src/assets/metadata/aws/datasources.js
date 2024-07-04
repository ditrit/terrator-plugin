const awsAmi = {
  type: 'aws_ami',
  blockType: 'data',
  displayName: 'Amazon Machine Image (AMI)',
  description: 'An Amazon Machine Image (AMI) is a supported and maintained image provided by AWS<br>that provides the information required to launch an instance.',
  icon: 'Aws_EC2_AMI',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html',
  categories: ['AWS', 'Data Sources'],
  tags: [],
  definedAttributes: [
    {
      name: 'owners',
      displayName: 'Owners',
      description: 'List of AMI owners to limit search.',
      type: 'Array',
      url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/finding-an-ami.html',
    },
    {
      name: 'most_recent',
      displayName: 'Most recent',
      description: 'If more than one result is returned, use the most recent AMI.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/ami#most_recent',
    },
    {
      name: 'executable_users',
      displayName: 'Executable users',
      description: 'Limit search to users with explicit launch permission on the image.',
      type: 'Array',
      url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html',
    },
    {
      name: 'include_deprecated',
      displayName: 'Include deprecated',
      description: 'If true, all deprecated AMIs are included in the response.',
      type: 'Boolean',
      url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ami-deprecate.html',
    },
    {
      name: 'name_regex',
      displayName: 'Name regex',
      description: 'Regex string to apply to the AMI list returned by AWS.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/ami#name_regex',
    },
  ],
};

const awsRdsEngineVersion = {
  type: 'aws_rds_engine_version',
  blockType: 'data',
  displayName: 'Relational Database Service engine version',
  description: 'Information about a Relational Database Service engine version.<br><br>Amazon Relational Database Service (Amazon RDS) is a web service<br>that makes it easier to set up, operate, and scale a relational database in the AWS Cloud.',
  icon: 'Aws_RDS',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html',
  categories: ['AWS', 'Data Sources'],
  tags: [],
  definedAttributes: [
    {
      name: 'engine',
      displayName: 'Engine',
      description: 'A DB engine is the specific relational database software that runs on your DB instance.',
      required: true,
      type: 'String',
      url: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome.Concepts.DBInstance.engine',
      rules: {
        values: [
          'aurora',
          'aurora-mysql',
          'aurora-postgresql',
          'docdb',
          'mariadb',
          'mysql',
          'neptune',
          'oracle-ee',
          'oracle-se',
          'oracle-se1',
          'oracle-se2',
          'postgres',
          'sqlserver-ee',
          'sqlserver-ex',
          'sqlserver-se',
          'sqlserver-web',
        ],
      },
    },
    {
      name: 'default_only',
      displayName: 'Default only',
      description: 'When set to true, the default version for the specified engine or combination of engine and major version will be returned.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/rds_engine_version#default_only',
    },
    {
      name: 'version',
      displayName: 'Version',
      description: 'Version of the DB engine.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/rds_engine_version#version',
    },
    {
      name: 'preferred_versions',
      displayName: 'Preferred versions',
      description: 'Ordered list of preferred engine versions.',
      type: 'Array',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/rds_engine_version#preferred_versions',
    },
    {
      name: 'include_all',
      displayName: 'Include all',
      description: 'When set to true, the specified version or member of prefered versions will be returned even if it is deprecated.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/rds_engine_version#include_all',
    },
    {
      name: 'parameter_group_family',
      displayName: 'Parameter group family',
      description: 'Name of a specific DB parameter group family.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/rds_engine_version#parameter_group_family',
    },
  ],
};

const awsAvailabilityZones = {
  type: 'aws_availability_zones',
  blockType: 'data',
  displayName: 'Availability Zones',
  description: 'The Availability Zones data source allows access to the list of AWS Availability Zones<br>which can be accessed by an AWS account within the region configured in the provider.<br><br>This is different from the Availability Zone (singular).',
  icon: 'Aws_Local-Zones',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html',
  categories: ['AWS', 'Data Sources'],
  tags: [],
  definedAttributes: [
    {
      name: 'all_availability_zones',
      displayName: 'All Availability Zones',
      description: 'Set to true to include all Availability Zones and Local Zones regardless of your opt in status.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/availability_zones#all_availability_zones',
    },
    {
      name: 'exclude_names',
      displayName: 'Exclude names',
      description: 'List of Availability Zone names to exclude.',
      type: 'Array',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/availability_zones#exclude_names',
    },
    {
      name: 'exclude_zone_ids',
      displayName: 'Exclude zone IDs',
      description: 'List of Availability Zone IDs to exclude.',
      type: 'Array',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/availability_zones#exclude_zone_ids',
    },
    {
      name: 'state',
      displayName: 'State',
      description: 'Allows to filter list of Availability Zones based on their current state.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/availability_zones#state',
      rules: {
        values: [
          'available',
          'impaired',
          'information',
          'unavailable',
        ],
      },
    },
  ],
};

export default [
  awsAmi,
  awsRdsEngineVersion,
  awsAvailabilityZones,
];
