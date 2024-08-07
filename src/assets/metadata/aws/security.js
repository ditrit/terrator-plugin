import { tags, vpcIdLink } from './default';

const awsSecurityGroup = {
  type: 'aws_security_group',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'Security group',
  description: 'A security group controls the traffic that is allowed to reach and leave the resources that it is associated with.',
  icon: 'AwsSecurityGroup',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html',
  categories: ['AWS', 'Security'],
  tags: [],
  definedAttributes: [
    {
      name: 'description',
      displayName: 'Description',
      description: 'Description of the security group.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#description',
    },
    {
      name: 'name',
      displayName: 'Name',
      description: 'Name of the security group.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#name',
    },
    {
      name: 'name_prefix',
      displayName: 'Name prefix',
      description: 'Creates a unique name beginning with the specified prefix.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#name_prefix',
    },
    {
      name: 'revoke_rules_on_delete',
      displayName: 'Revoke rules on delete',
      description: 'Instruct Terraform to revoke all of the Security Groups attached ingress and egress rules before deleting the rule itself.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#revoke_rules_on_delete',
    },
    {
      ...vpcIdLink,
      description: 'The ID of the VPC for which to create the security group.',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#vpc_id',
    },
    {
      name: 'egress',
      displayName: 'Egress',
      description: 'Configuration block for egress rules',
      type: 'Object',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#egress',
      definedAttributes: [
        {
          name: 'from_port',
          displayName: 'From port',
          description: 'Start port (or ICMP type number if protocol is icmp).',
          required: true,
          type: 'Number',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#from_port',
        },
        {
          name: 'to_port',
          displayName: 'To port',
          description: 'End port (or ICMP code if protocol is icmp).',
          required: true,
          type: 'Number',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#to_port',
        },
        {
          name: 'protocol',
          displayName: 'Protocol',
          description: 'The protocol. If not icmp, tcp, udp, or all use the -1 protocol number.',
          required: true,
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#protocol',
        },
        {
          name: 'cidr_blocks',
          displayName: 'CIDR blocks',
          description: 'List of CIDR blocks.',
          type: 'Array',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#cidr_blocks',
        },
        {
          name: 'ipv6_cidr_blocks',
          displayName: 'IPv6 CIDR blocks',
          description: 'List of IPv6 CIDR blocks.',
          type: 'Array',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#ipv6_cidr_blocks',
        },
      ],
    },
    {
      name: 'ingress',
      displayName: 'Ingress',
      description: 'Configuration block for Ingress rules',
      type: 'Object',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#ingress',
      definedAttributes: [
        {
          name: 'from_port',
          displayName: 'From port',
          description: 'Start port (or ICMP type number if protocol is icmp).',
          required: true,
          type: 'Number',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#from_port',
        },
        {
          name: 'to_port',
          displayName: 'To port',
          description: 'End port (or ICMP code if protocol is icmp).',
          required: true,
          type: 'Number',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#to_port',
        },
        {
          name: 'protocol',
          displayName: 'Protocol',
          description: 'The protocol. If not icmp, tcp, udp, or all use the -1 protocol number.',
          required: true,
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#protocol',
        },
        {
          name: 'cidr_blocks',
          displayName: 'CIDR blocks',
          description: 'List of CIDR blocks.',
          type: 'Array',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#cidr_blocks',
        },
        {
          name: 'ipv6_cidr_blocks',
          displayName: 'IPv6 CIDR blocks',
          description: 'List of IPv6 CIDR blocks.',
          type: 'Array',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group#ipv6_cidr_blocks',
        },
      ],
    },
    tags,
  ],
};

const awsKeyPair = {
  type: 'aws_key_pair',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'AWS key pair',
  description: 'A set of security credentials to prove your identity when connecting to an Amazon EC2 instance.',
  icon: 'Aws_Identity-Access-Management_Long-Term-Security-Credential',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html',
  categories: ['AWS', 'Security'],
  tags: [],
  definedAttributes: [
    {
      name: 'key_name',
      displayName: 'Key name',
      description: 'The name for the key pair.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/key_pair#key_name',
    },
    {
      name: 'public_key',
      displayName: 'Public key',
      description: 'The public key material.',
      required: true,
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/key_pair#public_key',
    },
    {
      name: 'key_name_prefix',
      displayName: 'Key name prefix',
      description: 'Creates a unique name beginning with the specified prefix.<br>Conflicts with key_name.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/key_pair#key_name_prefix',
    },
    {
      ...tags,
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/key_pair#tags',
    },
  ],
};

export default [
  awsSecurityGroup,
  awsKeyPair,
];
