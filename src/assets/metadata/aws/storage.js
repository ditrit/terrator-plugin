const awsEbsVolume = {
  type: 'aws_ebs_volume',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'EBS Volume',
  description: 'A durable, block-level storage device that you can attach to your instances.',
  icon: 'Aws_Elastic-Block-Store_Volume',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volumes.html',
  categories: ['AWS', 'Storage'],
  tags: [],
  definedAttributes: [
    {
      name: 'availability_zone',
      displayName: 'Availability zone',
      description: 'The Availability Zone where the EBS volume will exist.',
      required: true,
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ebs_volume#availability_zone',
    },
  ],
};

const awsVolumeAttachment = {
  type: 'aws_volume_attachment',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'AWS volume attachment',
  description: 'Attach an EBS volume to one or more instances',
  icon: 'Aws_Elastic-Block-Store_Volume',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-attaching-volume.html',
  categories: ['AWS', 'Storage'],
  tags: [],
  definedAttributes: [
    {
      name: 'device_name',
      displayName: 'Device name',
      description: 'The device name to expose to the instance (for example, /dev/sdh or xvdh).',
      required: true,
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/volume_attachment#device_name',
    },
    {
      name: 'volume_id',
      displayName: 'Volume ID',
      description: 'The ID of the Volume to attach to.',
      linkAttribute: 'id',
      linkRef: 'aws_ebs_volume',
      linkType: 'Default',
      linkModel: 'defaultLink',
      required: true,
      type: 'Link',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/volume_attachment#volume_id',
    },
    {
      name: 'instance_id',
      displayName: 'Instance ID',
      description: 'The ID of the Instance to attach to.',
      linkAttribute: 'id',
      linkRef: 'aws_instance',
      linkType: 'Default',
      linkModel: 'defaultLink',
      required: true,
      type: 'Link',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/volume_attachment#instance_id',
    },
  ],
};

const awsS3Bucket = {
  type: 'aws_s3_bucket',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'S3 bucket',
  description: 'Amazon Simple Storage Service (Amazon S3) is an object storage service.',
  icon: 'Aws_Storage-Service_Bucket',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html',
  categories: ['AWS', 'Storage'],
  tags: [],
  definedAttributes: [
    {
      name: 'bucket',
      displayName: 'Bucket name',
      description: 'The name of the bucket.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket#bucket',
      rules: {
        max: 63,
        min: 1,
      },
    },
    {
      name: 'bucket_prefix',
      displayName: 'Bucket prefix',
      description: 'Creates a unique bucket name beginning with the specified prefix.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket#bucket_prefix',
      rules: {
        max: 63,
        min: 1,
      },
    },
    {
      name: 'force_destroy',
      displayName: 'Force destroy',
      description: 'Indicates if all objects (including any locked objects) should be deleted from the bucket<br>when the bucket is destroyed so that the bucket can be destroyed without error.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket#force_destroy',
    },
    {
      name: 'object_lock_enabled',
      displayName: 'Object lock enabled',
      description: 'Indicates whether this bucket has an Object Lock configuration enabled.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket#object_lock_enabled',
    },
    {
      name: 'tags',
      displayName: 'Tags',
      description: 'A map of tags to assign to the resource.',
      type: 'Object',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket#tags',
    },
  ],
};

const awsS3BucketAcl = {
  type: 'aws_s3_bucket_acl',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'S3 bucket Access Control List (ACL)',
  description: 'Amazon S3 access control lists (ACLs) enable you to manage access to buckets and objects.',
  icon: 'Aws_Storage-Service_Bucket-ACL',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/acls.html',
  categories: ['AWS', 'Storage'],
  tags: [],
  definedAttributes: [
    {
      name: 'bucket',
      displayName: 'Bucket',
      description: 'The name of the bucket to put the ACL in.',
      linkRef: 'aws_s3_bucket',
      linkType: 'Default',
      linkModel: 'defaultLink',
      required: true,
      type: 'Link',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_acl#bucket',
    },
    {
      name: 'acl',
      displayName: 'ACL',
      description: 'ACL to apply to the bucket<br>Conflicts with access_control_policy',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_acl#acl',
    },
    {
      name: 'expected_bucket_owner',
      displayName: 'Bucket owner',
      description: 'Account ID of the expected bucket owner',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_acl#expected_bucket_owner',
    },
  ],
};

const awsEfsFileSystem = {
  type: 'aws_efs_file_system',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'EFS File System',
  description: 'Provides an Elastic File System (EFS) File System resource.',
  icon: 'Amazon-EFS',
  model: 'DefaultModel',
  url: 'https://aws.amazon.com/efs/?nc1=h_ls',
  categories: ['AWS', 'Storage'],
  tags: [],
  definedAttributes: [
    {
      name: 'arn',
      displayName: 'ARN',
      description: 'Amazon Resource Name (ARN) of the file system.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system#arn',
    },
    {
      name: 'availability_zone_name',
      displayName: 'Availability zone name',
      description: 'The AWS Availability Zone in which to create the file system.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system#availability_zone_name',
    },
    {
      name: 'availability_zone_id',
      displayName: 'Availability zone ID',
      description: 'The identifier of the Availability Zone in which the file system\'s One Zone storage classes exist.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system#availability_zone_id',
    },
    {
      name: 'creation_token',
      displayName: 'Creation token',
      description: 'A unique name used as reference when creating the Elastic File System to ensure idempotent file system creation.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system#creation_token',
      rules: {
        max: '64',
        min: '1',
      },
    },
    {
      name: 'encrypted',
      displayName: 'Encrypted',
      description: 'If true, the disk will be encrypted.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system#encrypted',
    },
    {
      name: 'kms_key_id',
      displayName: 'Encrypted',
      description: 'Amazon Resource Name (ARN) for the Key Management Service (KMS) encryption key.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system#kms_key_id',
    },
    {
      name: 'lifecycle_policy',
      displayName: 'Lifecycle policy',
      description: 'A file system lifecycle policy',
      type: 'Object',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system#lifecycle_policy',
      definedAttributes: [
        {
          name: 'transition_to_ia',
          displayName: 'Transition to IA',
          description: 'Indicates how long it takes to transition files to the IA storage class.',
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system#transition_to_ia',
          rules: {
            values: [
              'AFTER_1_DAY',
              'AFTER_7_DAYS',
              'AFTER_14_DAYS',
              'AFTER_30_DAYS',
              'AFTER_60_DAYS',
              'AFTER_90_DAYS',
            ],
          },
        },
        {
          name: 'transition_to_primary_storage_class',
          displayName: 'Transition to primary storage class',
          description: 'Describes the policy used to transition a file from infrequent access storage to primary storage.',
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system#transition_to_primary_storage_class',
          rules: {
            values: [
              'AFTER_1_ACCESS',
            ],
          },
        },
      ],
    },
    {
      name: 'performance_mode',
      displayName: 'Performance mode',
      description: 'The file system performance mode.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system#performance_mode',
      rules: {
        values: [
          'generalPurpose',
          'maxIO',
        ],
      },
    },
    {
      name: 'provisioned_throughput_in_mibps',
      displayName: 'Provisioned throughput in Mibps',
      description: 'The throughput, measured in MiB/s, that you want to provision for the file system.',
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system#provisioned_throughput_in_mibps',
    },
    {
      name: 'throughput_mode',
      displayName: 'Throughput mode',
      description: 'Throughput mode for the file system.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system#throughput_mode',
      rules: {
        values: [
          'bursting',
          'provisioned',
          'elastic',
        ],
      },
    },
    {
      name: 'size_in_bytes',
      displayName: 'Size in bytes',
      description: 'Current byte count used by the file system.',
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/efs_file_system#size_in_bytes',
    },
    {
      name: 'tags',
      displayName: 'Tags',
      description: 'A mapping of tags to assign to the file system.',
      type: 'Object',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_file_system#tags',
    },
  ],
};

const awsEfsMountTarget = {
  type: 'aws_efs_mount_target',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'EFS Mount Target',
  description: 'Provide an Elastic File System (EFS) mount target.',
  icon: 'Amazon-EFS',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/efs/latest/ug/accessing-fs.html',
  categories: ['AWS', 'Storage'],
  tags: [],
  definedAttributes: [
    {
      name: 'file_system_id',
      displayName: 'File system ID',
      description: 'The ID of the file system for which the mount target is intended.',
      linkRef: 'aws_efs_file_system',
      linkType: 'Default',
      linkModel: 'defaultLink',
      required: true,
      type: 'Link',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_mount_target#file_system_id',
    },
    {
      name: 'subnet_id',
      displayName: 'Subnet ID',
      description: 'The ID of the subnet to add the mount target in.',
      linkRef: 'aws_subnet',
      linkType: 'Default',
      linkModel: 'defaultLink',
      required: true,
      type: 'Link',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_mount_target#subnet_id',
    },
    {
      name: 'ip_address',
      displayName: 'IP address',
      description: 'The address (within the address range of the specified subnet) at which the file system may be mounted via the mount target.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_mount_target#ip_address',
    },
    {
      name: 'security_groups',
      displayName: 'Security groups',
      description: 'A list of up to 5 VPC security group IDs (that must be for the same VPC as subnet specified) in effect for the mount target.',
      linkRef: 'aws_security_group',
      linkType: 'Default',
      linkModel: 'defaultLink',
      type: 'Link',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/efs_mount_target#security_groups',
    },
  ],
};

export default [
  awsEbsVolume,
  awsVolumeAttachment,
  awsS3Bucket,
  awsS3BucketAcl,
  awsEfsFileSystem,
  awsEfsMountTarget,
];