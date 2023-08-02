import { Component } from 'leto-modelizer-plugin-core';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import TerraformComponentDefinition from 'src/models/TerraformComponentDefinition';
import TerraformVariable from 'src/models/TerraformVariable';
import { getTerraformMetadata } from 'tests/resources/utils';

const metadata = getTerraformMetadata(
  'aws',
  'tests/resources/metadata/aws.json',
);
metadata.parse();

const awsDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws');
const regionDefinition = awsDefinition.definedAttributes.find(({ name }) => name === 'region');

const awsAmiDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_ami');

const awsVpcDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_vpc');

const awsSubnetDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_subnet');
const awsSubnetVpcIdDefinition = awsSubnetDefinition.definedAttributes.find(({ name }) => name === 'vpc_id');

const awsInternetGatewayDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_internet_gateway');
const awsInternetGatewayVpcIdDefinition = awsInternetGatewayDefinition.definedAttributes.find(({ name }) => name === 'vpc_id');

const awsRouteTableAssociationDefinition = new TerraformComponentDefinition({
  blockType: 'resource',
  type: 'aws_route_table_association',
});

const awsSecurityGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_security_group');
const awsSecurityGroupVpcIdDefinition = awsSecurityGroupDefinition.definedAttributes.find(({ name }) => name === 'vpc_id');

const awsDbInstanceDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_db_instance');
const dbInstanceVpcSecurityGroupIdsDefinition = awsDbInstanceDefinition.definedAttributes.find(({ name }) => name === 'vpc_security_group_ids');
const dbInstanceClassDefinition = awsDbInstanceDefinition.definedAttributes.find(({ name }) => name === 'instance_class');
const dbInstanceSubnetGroupNameDefinition = awsDbInstanceDefinition.definedAttributes.find(({ name }) => name === 'db_subnet_group_name');

const awsDbSubnetGroupDefinition = metadata.pluginData.definitions.components.find(({ type }) => type === 'aws_db_subnet_group');
const subnetGroupSubnetIdsDefinition = awsDbSubnetGroupDefinition.definedAttributes.find(({ name }) => name === 'subnet_ids');

export const mainComponents = [
  new Component({
    id: 'aws_1',
    name: null,
    path: 'new_file.tf',
    definition: awsDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'region',
        type: 'String',
        value: 'eu-west-3',
        definition: regionDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'access_key',
        type: 'String',
        value: 'ACCESS_KEY',
        isDynamic: false,
      }),
      new TerraformComponentAttribute({
        name: 'secret_key',
        type: 'String',
        value: 'SECRET_KEY',
        isDynamic: false,
      }),
      new TerraformComponentAttribute({
        name: 'default_tags',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'tags',
            type: 'Object',
            isDynamic: false,
            value: [
              new TerraformComponentAttribute({
                name: 'project_tag',
                type: 'String',
                value: 'var.project_tag',
              }),
            ],
          }),
        ],
      }),
    ],
  }),
  new Component({
    name: null,
    id: 'ubuntu',
    path: 'new_file.tf',
    definition: awsAmiDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'most_recent',
        type: 'Boolean',
        value: true,
      }),
      new TerraformComponentAttribute({
        name: 'filter',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'name',
            type: 'String',
            value: 'name',
          }),
          new TerraformComponentAttribute({
            name: 'values',
            type: 'Array',
            value: ['ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*'],
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'filter',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'name',
            type: 'String',
            value: 'virtualization-type',
          }),
          new TerraformComponentAttribute({
            name: 'values',
            type: 'Array',
            value: ['hvm'],
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'owners',
        type: 'Array',
        value: ['099720109477'],
      }),
    ],
  }),
  new Component({
    id: 'cms_db_version',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'data',
      type: 'aws_rds_engine_version',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'engine',
        type: 'String',
        value: 'mariadb',
      }),
      new TerraformComponentAttribute({
        name: 'default_only',
        type: 'Boolean',
        value: true,
      }),
    ],
  }),
  new Component({
    id: 'available',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'data',
      type: 'aws_availability_zones',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'state',
        type: 'String',
        value: 'available',
      }),
    ],
  }),
  new Component({
    id: 'cms_main_vpc',
    name: null,
    path: 'new_file.tf',
    definition: awsVpcDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_network_cidr',
      }),
      new TerraformComponentAttribute({
        name: 'instance_tenancy',
        type: 'String',
        value: 'default',
      }),
    ],
  }),
  new Component({
    id: 'cms_frontend_subnet_az1',
    name: null,
    path: 'new_file.tf',
    definition: awsSubnetDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.cms_main_vpc.id',
        definition: awsSubnetVpcIdDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_frontend_cidr_az1',
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        value: [
          new TerraformComponentAttribute({
            name: 'Name',
            type: 'String',
            value: 'cms_frontend_subnet_az1',
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_frontend_subnet_az2',
    name: null,
    path: 'new_file.tf',
    definition: awsSubnetDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.cms_main_vpc.id',
        definition: awsSubnetVpcIdDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_frontend_cidr_az2',
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        value: [
          new TerraformComponentAttribute({
            name: 'Name',
            type: 'String',
            value: 'cms_frontend_subnet_az2',
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_internet_gw',
    name: null,
    path: 'new_file.tf',
    definition: awsInternetGatewayDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.cms_main_vpc.id',
        definition: awsInternetGatewayVpcIdDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        value: [
          new TerraformComponentAttribute({
            name: 'Name',
            type: 'String',
            value: 'Main CMS VPC - Internet Gateway',
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_routing_tbl',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_route_table',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.cms_main_vpc.id',
      }),
      new TerraformComponentAttribute({
        name: 'route',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'cidr_block',
            type: 'String',
            value: '0.0.0.0/0',
          }),
          new TerraformComponentAttribute({
            name: 'gateway_id',
            type: 'String',
            value: 'aws_internet_gateway.cms_internet_gw.id',
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        value: [
          new TerraformComponentAttribute({
            name: 'Name',
            type: 'String',
            value: 'Public Subnet Route Table',
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_lb_subnet_az1',
    name: null,
    path: 'new_file.tf',
    definition: awsSubnetDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.cms_main_vpc.id',
        definition: awsSubnetVpcIdDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_lb_cidr_az1',
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        value: [
          new TerraformComponentAttribute({
            name: 'Name',
            type: 'String',
            value: 'cms_lb_subnet_az1',
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_lb_subnet_az2',
    name: null,
    path: 'new_file.tf',
    definition: awsSubnetDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.cms_main_vpc.id',
        definition: awsSubnetVpcIdDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_lb_cidr_az2',
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        value: [
          new TerraformComponentAttribute({
            name: 'Name',
            type: 'String',
            value: 'cms_lb_subnet_az2',
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_lb_subnet_az1_gw_assoc',
    name: null,
    path: 'new_file.tf',
    definition: awsRouteTableAssociationDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'subnet_id',
        type: 'String',
        value: 'aws_subnet.cms_lb_subnet_az1.id',
      }),
      new TerraformComponentAttribute({
        name: 'route_table_id',
        type: 'String',
        value: 'aws_route_table.cms_routing_tbl.id',
      }),
    ],
  }),
  new Component({
    id: 'cms_lb_subnet_az2_gw_assoc',
    name: null,
    path: 'new_file.tf',
    definition: awsRouteTableAssociationDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'subnet_id',
        type: 'String',
        value: 'aws_subnet.cms_lb_subnet_az2.id',
      }),
      new TerraformComponentAttribute({
        name: 'route_table_id',
        type: 'String',
        value: 'aws_route_table.cms_routing_tbl.id',
      }),
    ],
  }),
  new Component({
    id: 'cms_backend_subnet_az1',
    name: null,
    path: 'new_file.tf',
    definition: awsSubnetDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.cms_main_vpc.id',
        definition: awsSubnetVpcIdDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_backend_cidr_az1',
      }),
      new TerraformComponentAttribute({
        name: 'availability_zone',
        type: 'String',
        value: 'data.aws_availability_zones.available.names[0]',
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        value: [
          new TerraformComponentAttribute({
            name: 'Name',
            type: 'String',
            value: 'cms_backend_subnet_az1',
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_backend_subnet_az2',
    name: null,
    path: 'new_file.tf',
    definition: awsSubnetDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.cms_main_vpc.id',
        definition: awsSubnetVpcIdDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_backend_cidr_az2',
      }),
      new TerraformComponentAttribute({
        name: 'availability_zone',
        type: 'String',
        value: 'data.aws_availability_zones.available.names[1]',
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        value: [
          new TerraformComponentAttribute({
            name: 'Name',
            type: 'String',
            value: 'cms_backend_subnet_az2',
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_dmz_subnet',
    name: null,
    path: 'new_file.tf',
    definition: awsSubnetDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.cms_main_vpc.id',
        definition: awsSubnetVpcIdDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_dmz_cidr',
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        value: [
          new TerraformComponentAttribute({
            name: 'Name',
            type: 'String',
            value: 'cms_dmz_subnet',
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_frontend_secgroup',
    name: null,
    path: 'new_file.tf',
    definition: awsSecurityGroupDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms_frontend_secgroup',
      }),
      new TerraformComponentAttribute({
        name: 'description',
        type: 'String',
        value: 'Default Rules for the CMS Front-End servers',
      }),
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.cms_main_vpc.id',
        definition: awsSecurityGroupVpcIdDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'description',
            type: 'String',
            value: 'HTTP from VPC',
          }),
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 8000,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 8000,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: 'tcp',
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'Array',
            value: ['aws_vpc.cms_main_vpc.cidr_block'],
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'description',
            type: 'String',
            value: 'NFS from VPC',
          }),
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 2049,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 2049,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: 'tcp',
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'Array',
            value: ['aws_vpc.cms_main_vpc.cidr_block'],
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'egress',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 0,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 0,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: '-1',
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'Array',
            value: ['0.0.0.0/0'],
          }),
          new TerraformComponentAttribute({
            name: 'ipv6_cidr_blocks',
            type: 'Array',
            value: ['::/0'],
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 22,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 22,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: 'tcp',
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'String',
            value: 'var.lb_allowed_cidr',
          }),
        ],
      }),

    ],
  }),
  new Component({
    id: 'cms_backend_secgroup',
    name: null,
    path: 'new_file.tf',
    definition: awsSecurityGroupDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms_backend_secgroup',
      }),
      new TerraformComponentAttribute({
        name: 'description',
        type: 'String',
        value: 'Default Rules for the CMS Back-End servers',
      }),
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.cms_main_vpc.id',
        definition: awsSecurityGroupVpcIdDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'description',
            type: 'String',
            value: 'MySQL from VPC',
          }),
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 3306,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 3306,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: 'tcp',
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'Array',
            value: ['aws_vpc.cms_main_vpc.cidr_block'],
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'egress',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 0,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 0,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: '-1',
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'Array',
            value: ['0.0.0.0/0'],
          }),
          new TerraformComponentAttribute({
            name: 'ipv6_cidr_blocks',
            type: 'Array',
            value: ['::/0'],
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_lb_secgroup',
    name: null,
    path: 'new_file.tf',
    definition: awsSecurityGroupDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms_lb_secgroup',
      }),
      new TerraformComponentAttribute({
        name: 'description',
        type: 'String',
        value: 'Default Rules for the CMS LoadBalancer',
      }),
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.cms_main_vpc.id',
        definition: awsSecurityGroupVpcIdDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 443,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 443,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: 'tcp',
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'String',
            value: 'var.lb_allowed_cidr',
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 80,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 80,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: 'tcp',
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'String',
            value: 'var.lb_allowed_cidr',
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'egress',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 0,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 0,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: '-1',
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'Array',
            value: ['0.0.0.0/0'],
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_lb_logs_bucket',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_s3_bucket',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'bucket',
        type: 'String',
        value: 'cmslblogsbucket',
      }),
    ],
  }),
  new Component({
    id: 'cms_lb_logs_bucket_acl',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_s3_bucket_acl',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'bucket',
        type: 'String',
        value: 'aws_s3_bucket.cms_lb_logs_bucket.id',
      }),
      new TerraformComponentAttribute({
        name: 'acl',
        type: 'String',
        value: 'private',
      }),
    ],
  }),

  new Component({
    id: 'cms_frontend_lb',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_lb',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms-frontend-lb',
      }),
      new TerraformComponentAttribute({
        name: 'internal',
        type: 'Boolean',
        value: false,
      }),
      new TerraformComponentAttribute({
        name: 'load_balancer_type',
        type: 'String',
        value: 'application',
      }),
      new TerraformComponentAttribute({
        name: 'security_groups',
        type: 'Array',
        value: ['aws_security_group.cms_lb_secgroup.id'],
      }),
      new TerraformComponentAttribute({
        name: 'subnets',
        type: 'Array',
        value: ['aws_subnet.cms_lb_subnet_az1.id', 'aws_subnet.cms_lb_subnet_az2.id'],
      }),
      new TerraformComponentAttribute({
        name: 'enable_deletion_protection',
        type: 'Boolean',
        value: true,
      }),
      new TerraformComponentAttribute({
        name: 'access_logs',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'bucket',
            type: 'String',
            value: 'aws_s3_bucket.cms_lb_logs_bucket.bucket',
          }),
          new TerraformComponentAttribute({
            name: 'prefix',
            type: 'String',
            value: 'lb-logs-',
          }),
          new TerraformComponentAttribute({
            name: 'enabled',
            type: 'Boolean',
            value: false,
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_lb_target',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_lb_target_group',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cmslbtarget',
      }),
      new TerraformComponentAttribute({
        name: 'target_type',
        type: 'String',
        value: 'instance',
      }),
      new TerraformComponentAttribute({
        name: 'port',
        type: 'Number',
        value: 8000,
      }),
      new TerraformComponentAttribute({
        name: 'protocol',
        type: 'String',
        value: 'HTTP',
      }),
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'aws_vpc.cms_main_vpc.id',
      }),
    ],
  }),
  new Component({
    id: 'cms_launch_conf',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_launch_configuration',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'name_prefix',
        type: 'String',
        value: 'web-',
      }),
      new TerraformComponentAttribute({
        name: 'image_id',
        type: 'String',
        value: 'data.aws_ami.ubuntu.id',
      }),
      new TerraformComponentAttribute({
        name: 'instance_type',
        type: 'String',
        value: 'var.ec2_frontend_sku',
      }),
      new TerraformComponentAttribute({
        name: 'security_groups',
        type: 'Array',
        value: ['aws_security_group.cms_frontend_secgroup.id'],
      }),
    ],
  }),
  new Component({
    id: 'cms_asg',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_autoscaling_group',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms-asg',
      }),
      new TerraformComponentAttribute({
        name: 'min_size',
        type: 'Number',
        value: 1,
      }),
      new TerraformComponentAttribute({
        name: 'desired_capacity',
        type: 'Number',
        value: 1,
      }),
      new TerraformComponentAttribute({
        name: 'max_size',
        type: 'Number',
        value: 2,
      }),
      new TerraformComponentAttribute({
        name: 'health_check_type',
        type: 'String',
        value: 'ELB',
      }),
      new TerraformComponentAttribute({
        name: 'target_group_arns',
        type: 'Array',
        value: ['aws_lb_target_group.cms_lb_target.arn'],
      }),
      new TerraformComponentAttribute({
        name: 'launch_configuration',
        type: 'String',
        value: 'aws_launch_configuration.cms_launch_conf.name',
      }),
      new TerraformComponentAttribute({
        name: 'vpc_zone_identifier',
        type: 'Array',
        value: ['aws_subnet.cms_frontend_subnet_az1.id', 'aws_subnet.cms_frontend_subnet_az2.id'],
      }),
      new TerraformComponentAttribute({
        name: 'lifecycle',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'create_before_destroy',
            type: 'Boolean',
            value: true,
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_policy_up',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_autoscaling_policy',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'web_policy_up',
      }),
      new TerraformComponentAttribute({
        name: 'scaling_adjustment',
        type: 'Number',
        value: 1,
      }),
      new TerraformComponentAttribute({
        name: 'adjustment_type',
        type: 'String',
        value: 'ChangeInCapacity',
      }),
      new TerraformComponentAttribute({
        name: 'cooldown',
        type: 'Number',
        value: 300,
      }),
      new TerraformComponentAttribute({
        name: 'autoscaling_group_name',
        type: 'String',
        value: 'aws_autoscaling_group.cms_asg.name',
      }),
    ],
  }),
  new Component({
    id: 'cms_cpu_alarm_up',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_cloudwatch_metric_alarm',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'alarm_name',
        type: 'String',
        value: 'cms_cpu_alarm_up',
      }),
      new TerraformComponentAttribute({
        name: 'comparison_operator',
        type: 'String',
        value: 'GreaterThanOrEqualToThreshold',
      }),
      new TerraformComponentAttribute({
        name: 'evaluation_periods',
        type: 'String',
        value: '2',
      }),
      new TerraformComponentAttribute({
        name: 'metric_name',
        type: 'String',
        value: 'CPUUtilization',
      }),
      new TerraformComponentAttribute({
        name: 'namespace',
        type: 'String',
        value: 'AWS/EC2',
      }),
      new TerraformComponentAttribute({
        name: 'period',
        type: 'String',
        value: '120',
      }),
      new TerraformComponentAttribute({
        name: 'statistic',
        type: 'String',
        value: 'Average',
      }),
      new TerraformComponentAttribute({
        name: 'threshold',
        type: 'String',
        value: '85',
      }),
      new TerraformComponentAttribute({
        name: 'dimensions',
        type: 'Object',
        isDynamic: false,
        value: [
          new TerraformComponentAttribute({
            name: 'AutoScalingGroupName',
            type: 'String',
            value: 'aws_autoscaling_group.cms_asg.name',
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'alarm_description',
        type: 'String',
        value: 'This metric monitor EC2 instance CPU utilization',
      }),
      new TerraformComponentAttribute({
        name: 'alarm_actions',
        type: 'Array',
        value: ['aws_autoscaling_policy.cms_policy_up.arn'],
      }),
    ],
  }),
  new Component({
    id: 'cms_policy_down',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_autoscaling_policy',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms_policy_down',
      }),
      new TerraformComponentAttribute({
        name: 'scaling_adjustment',
        type: 'Number',
        value: -1,
      }),
      new TerraformComponentAttribute({
        name: 'adjustment_type',
        type: 'String',
        value: 'ChangeInCapacity',
      }),
      new TerraformComponentAttribute({
        name: 'cooldown',
        type: 'Number',
        value: 300,
      }),
      new TerraformComponentAttribute({
        name: 'autoscaling_group_name',
        type: 'String',
        value: 'aws_autoscaling_group.cms_asg.name',
      }),
    ],
  }),
  new Component({
    id: 'cms_cpu_alarm_down',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_cloudwatch_metric_alarm',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'alarm_name',
        type: 'String',
        value: 'cms_cpu_alarm_down',
      }),
      new TerraformComponentAttribute({
        name: 'comparison_operator',
        type: 'String',
        value: 'LessThanOrEqualToThreshold',
      }),
      new TerraformComponentAttribute({
        name: 'evaluation_periods',
        type: 'String',
        value: '2',
      }),
      new TerraformComponentAttribute({
        name: 'metric_name',
        type: 'String',
        value: 'CPUUtilization',
      }),
      new TerraformComponentAttribute({
        name: 'namespace',
        type: 'String',
        value: 'AWS/EC2',
      }),
      new TerraformComponentAttribute({
        name: 'period',
        type: 'String',
        value: '120',
      }),
      new TerraformComponentAttribute({
        name: 'statistic',
        type: 'String',
        value: 'Average',
      }),
      new TerraformComponentAttribute({
        name: 'threshold',
        type: 'String',
        value: '30',
      }),
      new TerraformComponentAttribute({
        name: 'dimensions',
        type: 'Object',
        isDynamic: false,
        value: [
          new TerraformComponentAttribute({
            name: 'AutoScalingGroupName',
            type: 'String',
            value: 'aws_autoscaling_group.cms_asg.name',
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'alarm_description',
        type: 'String',
        value: 'This metric monitor EC2 instance CPU utilization',
      }),
      new TerraformComponentAttribute({
        name: 'alarm_actions',
        type: 'Array',
        value: ['aws_autoscaling_policy.cms_policy_down.arn'],
      }),
    ],
  }),
  new Component({
    id: 'cms_fileshare',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_efs_file_system',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        value: [
          new TerraformComponentAttribute({
            name: 'Name',
            type: 'String',
            value: 'cms_fileshare',
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_lb_listener',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_lb_listener',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'load_balancer_arn',
        type: 'String',
        value: 'aws_lb.cms_frontend_lb.arn',
      }),
      new TerraformComponentAttribute({
        name: 'port',
        type: 'String',
        value: '80',
      }),
      new TerraformComponentAttribute({
        name: 'protocol',
        type: 'String',
        value: 'HTTP',
      }),
      new TerraformComponentAttribute({
        name: 'default_action',
        type: 'Object',
        isDynamic: true,
        value: [
          new TerraformComponentAttribute({
            name: 'type',
            type: 'String',
            value: 'forward',
          }),
          new TerraformComponentAttribute({
            name: 'target_group_arn',
            type: 'String',
            value: 'aws_lb_target_group.cms_lb_target.arn',
          }),
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_fileshare_mount',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'aws_efs_mount_target',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'file_system_id',
        type: 'String',
        value: 'aws_efs_file_system.cms_fileshare.id',
      }),
      new TerraformComponentAttribute({
        name: 'subnet_id',
        type: 'String',
        value: 'aws_subnet.cms_frontend_subnet_az1.id',
      }),
    ],
  }),
  new Component({
    id: 'cms_db_subnets',
    name: null,
    path: 'new_file.tf',
    definition: awsDbSubnetGroupDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms-db-main-subnets',
      }),
      new TerraformComponentAttribute({
        name: 'subnet_ids',
        type: 'Array',
        definition: subnetGroupSubnetIdsDefinition,
        value: [
          'aws_subnet.cms_backend_subnet_az1.id',
          'aws_subnet.cms_backend_subnet_az2.id',
        ],
      }),
    ],
  }),
  new Component({
    id: 'cms_db_username',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'random_string',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'length',
        type: 'Number',
        value: 8,
      }),
      new TerraformComponentAttribute({
        name: 'special',
        type: 'Boolean',
        value: false,
      }),
    ],
  }),
  new Component({
    id: 'cms_db_passwd',
    name: null,
    path: 'new_file.tf',
    definition: new TerraformComponentDefinition({
      blockType: 'resource',
      type: 'random_password',
    }),
    attributes: [
      new TerraformComponentAttribute({
        name: 'length',
        type: 'Number',
        value: 16,
      }),
      new TerraformComponentAttribute({
        name: 'special',
        type: 'Boolean',
        value: true,
      }),
      new TerraformComponentAttribute({
        name: 'override_special',
        type: 'String',
        value: '!$%&*()-_ =+',
      }),
    ],
  }),
  new Component({
    id: 'cms_db',
    name: null,
    path: 'new_file.tf',
    definition: awsDbInstanceDefinition,
    attributes: [
      new TerraformComponentAttribute({
        name: 'allocated_storage',
        type: 'Number',
        value: 10,
      }),
      new TerraformComponentAttribute({
        name: 'db_name',
        type: 'String',
        value: 'cmsdbmain',
      }),
      new TerraformComponentAttribute({
        name: 'engine',
        type: 'String',
        value: 'data.aws_rds_engine_version.cms_db_version.engine',
      }),
      new TerraformComponentAttribute({
        name: 'vpc_security_group_ids',
        type: 'Array',
        value: ['aws_security_group.cms_backend_secgroup.id'],
        definition: dbInstanceVpcSecurityGroupIdsDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'engine_version',
        type: 'String',
        value: 'data.aws_rds_engine_version.cms_db_version.version',
      }),
      new TerraformComponentAttribute({
        name: 'instance_class',
        type: 'String',
        value: 'var.rds_sku',
        definition: dbInstanceClassDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'db_subnet_group_name',
        type: 'String',
        value: 'aws_db_subnet_group.cms_db_subnets.name',
        definition: dbInstanceSubnetGroupNameDefinition,
      }),
      new TerraformComponentAttribute({
        name: 'username',
        type: 'String',
        value: 'random_string.cms_db_username.result',
      }),
      new TerraformComponentAttribute({
        name: 'password',
        type: 'String',
        value: 'random_password.cms_db_passwd.result',
      }),
      new TerraformComponentAttribute({
        name: 'skip_final_snapshot',
        type: 'Boolean',
        value: true,
      }),
      new TerraformComponentAttribute({
        name: 'publicly_accessible',
        type: 'Boolean',
        value: false,
      }),
    ],
  }),

];

export const mainVariables = [
  new TerraformVariable({
    category: 'variable',
    name: 'project_tag',
    defaultValue: 'orness-autoscaled-cms',
    type: 'string',
    path: 'new_file.tf',
  }),
  new TerraformVariable({
    category: 'variable',
    name: 'project_region',
    defaultValue: 'eu-west-3',
    type: 'string',
    path: 'new_file.tf',
  }),
  new TerraformVariable({
    category: 'variable',
    name: 'vpc_network_cidr',
    defaultValue: '10.0.0.0/16',
    type: 'string',
    path: 'new_file.tf',
  }),
  new TerraformVariable({
    category: 'variable',
    name: 'vpc_frontend_cidr_az1',
    defaultValue: '10.0.1.0/24',
    type: 'string',
    path: 'new_file.tf',
  }),
  new TerraformVariable({
    category: 'variable',
    name: 'vpc_frontend_cidr_az2',
    defaultValue: '10.0.2.0/24',
    type: 'string',
    path: 'new_file.tf',
  }),
  new TerraformVariable({
    category: 'variable',
    name: 'vpc_lb_cidr_az1',
    defaultValue: '10.0.3.0/24',
    type: 'string',
    path: 'new_file.tf',
  }),
  new TerraformVariable({
    category: 'variable',
    name: 'vpc_lb_cidr_az2',
    defaultValue: '10.0.4.0/24',
    type: 'string',
    path: 'new_file.tf',
  }),
  new TerraformVariable({
    category: 'variable',
    name: 'vpc_backend_cidr_az1',
    defaultValue: '10.0.5.0/24',
    type: 'string',
    path: 'new_file.tf',
  }),
  new TerraformVariable({
    category: 'variable',
    name: 'vpc_backend_cidr_az2',
    defaultValue: '10.0.6.0/24',
    type: 'string',
    path: 'new_file.tf',
  }),
  new TerraformVariable({
    category: 'variable',
    name: 'lb_allowed_cidr',
    defaultValue: ['176.136.249.31/32'],
    type: 'list(any)',
    path: 'new_file.tf',
  }),
  new TerraformVariable({
    category: 'variable',
    name: 'vpc_dmz_cidr',
    defaultValue: '10.0.101.0/24',
    type: 'string',
    path: 'new_file.tf',
  }),
  new TerraformVariable({
    category: 'variable',
    name: 'ec2_frontend_sku',
    defaultValue: 't3.micro',
    type: 'string',
    path: 'new_file.tf',
  }),
  new TerraformVariable({
    category: 'variable',
    name: 'ec2_frontend_count',
    defaultValue: 2,
    type: 'number',
    path: 'new_file.tf',
  }),
  new TerraformVariable({
    category: 'variable',
    name: 'rds_sku',
    defaultValue: 'db.t3.micro',
    type: 'string',
    path: 'new_file.tf',
  }),
];
