import TerraformComponent from 'src/models/TerraformComponent';
import TerraformComponentAttribute from 'src/models/TerraformComponentAttribute';
import TerraformVariable from 'src/models/TerraformVariable';
import TerraformMetadata from 'src/metadata/TerraformMetadata';
import TerraformData from 'src/models/TerraformData';

const metadata = new TerraformMetadata(new TerraformData());
metadata.parse();

const defs = {};
const setAttributes = (definition, definedAttributes) => {
  definedAttributes.forEach((attribute) => {
    definition.attrs[attribute.name] = {
      def: attribute,
      attrs: {},
    };

    setAttributes(definition.attrs[attribute.name], attribute.definedAttributes);
  });
};

metadata.pluginData.definitions.components.forEach((definition) => {
  if (!defs[definition.blockType]) {
    defs[definition.blockType] = {};
  }

  defs[definition.blockType][definition.type] = {
    def: definition,
    attrs: {},
  };
  setAttributes(defs[definition.blockType][definition.type], definition.definedAttributes);
});

export const mainComponents = [
  new TerraformComponent({
    id: 'id_1',
    externalId: 'aws',
    name: null,
    path: 'new_file.tf',
    definition: defs.provider.aws.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'region',
        type: 'String',
        value: 'eu-west-3',
        definition: defs.provider.aws.attrs.region.def,
      }),
      new TerraformComponentAttribute({
        name: 'access_key',
        type: 'String',
        value: 'ACCESS_KEY',
        isDynamic: false,
        definition: defs.provider.aws.attrs.access_key.def,
      }),
      new TerraformComponentAttribute({
        name: 'secret_key',
        type: 'String',
        value: 'SECRET_KEY',
        isDynamic: false,
        definition: defs.provider.aws.attrs.secret_key.def,
      }),
      new TerraformComponentAttribute({
        name: 'default_tags',
        type: 'Object',
        isDynamic: true,
        definition: defs.provider.aws.attrs.default_tags.def,
        value: [
          new TerraformComponentAttribute({
            name: 'tags',
            type: 'Object',
            isDynamic: false,
            definition: defs.provider.aws.attrs.default_tags.attrs.tags.def,
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
  new TerraformComponent({
    name: null,
    id: 'id_2',
    externalId: 'ubuntu',
    path: 'new_file.tf',
    definition: defs.data.aws_ami.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'most_recent',
        type: 'Boolean',
        value: true,
        definition: defs.data.aws_ami.attrs.most_recent.def,
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
        definition: defs.data.aws_ami.attrs.owners.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_3',
    externalId: 'cms_db_version',
    name: null,
    path: 'new_file.tf',
    definition: defs.data.aws_rds_engine_version.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'engine',
        type: 'String',
        value: 'mariadb',
        definition: defs.data.aws_rds_engine_version.attrs.engine.def,
      }),
      new TerraformComponentAttribute({
        name: 'default_only',
        type: 'Boolean',
        value: true,
        definition: defs.data.aws_rds_engine_version.attrs.default_only.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_4',
    externalId: 'available',
    name: null,
    path: 'new_file.tf',
    definition: defs.data.aws_availability_zones.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'state',
        type: 'String',
        value: 'available',
        definition: defs.data.aws_availability_zones.attrs.state.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_5',
    externalId: 'cms_main_vpc',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_vpc.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_network_cidr',
        definition: defs.resource.aws_vpc.attrs.cidr_block.def,
      }),
      new TerraformComponentAttribute({
        name: 'instance_tenancy',
        type: 'String',
        value: 'default',
        definition: defs.resource.aws_vpc.attrs.instance_tenancy.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_6',
    externalId: 'cms_frontend_subnet_az1',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_subnet.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'id_5',
        definition: defs.resource.aws_subnet.attrs.vpc_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_frontend_cidr_az1',
        definition: defs.resource.aws_subnet.attrs.cidr_block.def,
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        definition: defs.resource.aws_subnet.attrs.tags.def,
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
  new TerraformComponent({
    id: 'id_7',
    externalId: 'cms_frontend_subnet_az2',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_subnet.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'id_5',
        definition: defs.resource.aws_subnet.attrs.vpc_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_frontend_cidr_az2',
        definition: defs.resource.aws_subnet.attrs.cidr_block.def,
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        definition: defs.resource.aws_subnet.attrs.tags.def,
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
  new TerraformComponent({
    id: 'id_8',
    externalId: 'cms_internet_gw',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_internet_gateway.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'id_5',
        definition: defs.resource.aws_internet_gateway.attrs.vpc_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        definition: defs.resource.aws_internet_gateway.attrs.tags.def,
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
  new TerraformComponent({
    id: 'id_9',
    externalId: 'cms_routing_tbl',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_route_table.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'id_5',
        definition: defs.resource.aws_route_table.attrs.vpc_id.def,
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
            value: 'aws_internet_gateway.cms_internet_gw',
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        definition: defs.resource.aws_route_table.attrs.tags.def,
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
  new TerraformComponent({
    id: 'id_10',
    externalId: 'cms_lb_subnet_az1',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_subnet.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'id_5',
        definition: defs.resource.aws_subnet.attrs.vpc_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_lb_cidr_az1',
        definition: defs.resource.aws_subnet.attrs.cidr_block.def,
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        definition: defs.resource.aws_subnet.attrs.tags.def,
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
  new TerraformComponent({
    id: 'id_11',
    externalId: 'cms_lb_subnet_az2',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_subnet.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'id_5',
        definition: defs.resource.aws_subnet.attrs.vpc_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_lb_cidr_az2',
        definition: defs.resource.aws_subnet.attrs.cidr_block.def,
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        definition: defs.resource.aws_subnet.attrs.tags.def,
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
  new TerraformComponent({
    id: 'id_12',
    externalId: 'cms_lb_subnet_az1_gw_assoc',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_route_table_association.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'subnet_id',
        type: 'Array',
        value: ['id_10'],
        definition: defs.resource.aws_route_table_association.attrs.subnet_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'route_table_id',
        type: 'Array',
        value: ['id_9'],
        definition: defs.resource.aws_route_table_association.attrs.route_table_id.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_13',
    externalId: 'cms_lb_subnet_az2_gw_assoc',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_route_table_association.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'subnet_id',
        type: 'Array',
        value: ['id_11'],
        definition: defs.resource.aws_route_table_association.attrs.subnet_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'route_table_id',
        type: 'Array',
        value: ['id_9'],
        definition: defs.resource.aws_route_table_association.attrs.route_table_id.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_14',
    externalId: 'cms_backend_subnet_az1',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_subnet.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'id_5',
        definition: defs.resource.aws_subnet.attrs.vpc_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_backend_cidr_az1',
        definition: defs.resource.aws_subnet.attrs.cidr_block.def,
      }),
      new TerraformComponentAttribute({
        name: 'availability_zone',
        type: 'String',
        value: 'data.aws_availability_zones.available.names[0]',
        definition: defs.resource.aws_subnet.attrs.availability_zone.def,
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        definition: defs.resource.aws_subnet.attrs.tags.def,
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
  new TerraformComponent({
    id: 'id_15',
    externalId: 'cms_backend_subnet_az2',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_subnet.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'id_5',
        definition: defs.resource.aws_subnet.attrs.vpc_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_backend_cidr_az2',
        definition: defs.resource.aws_subnet.attrs.cidr_block.def,
      }),
      new TerraformComponentAttribute({
        name: 'availability_zone',
        type: 'String',
        value: 'data.aws_availability_zones.available.names[1]',
        definition: defs.resource.aws_subnet.attrs.availability_zone.def,
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        definition: defs.resource.aws_subnet.attrs.tags.def,
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
  new TerraformComponent({
    id: 'id_16',
    externalId: 'cms_dmz_subnet',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_subnet.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'String',
        value: 'id_5',
        definition: defs.resource.aws_subnet.attrs.vpc_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'cidr_block',
        type: 'String',
        value: 'var.vpc_dmz_cidr',
        definition: defs.resource.aws_subnet.attrs.cidr_block.def,
      }),
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        definition: defs.resource.aws_subnet.attrs.tags.def,
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
  new TerraformComponent({
    id: 'id_17',
    externalId: 'cms_frontend_secgroup',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_security_group.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms_frontend_secgroup',
        definition: defs.resource.aws_security_group.attrs.name.def,
      }),
      new TerraformComponentAttribute({
        name: 'description',
        type: 'String',
        value: 'Default Rules for the CMS Front-End servers',
        definition: defs.resource.aws_security_group.attrs.description.def,
      }),
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'Array',
        value: ['id_5'],
        definition: defs.resource.aws_security_group.attrs.vpc_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Object',
        isDynamic: true,
        definition: defs.resource.aws_security_group.attrs.ingress.def,
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
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.from_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 8000,
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.to_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: 'tcp',
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.protocol.def,
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'Array',
            value: ['aws_vpc.cms_main_vpc.cidr_block'],
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.cidr_blocks.def,
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Object',
        isDynamic: true,
        definition: defs.resource.aws_security_group.attrs.ingress.def,
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
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.from_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 2049,
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.to_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: 'tcp',
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.protocol.def,
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'Array',
            value: ['aws_vpc.cms_main_vpc.cidr_block'],
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.cidr_blocks.def,
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'egress',
        type: 'Object',
        isDynamic: true,
        definition: defs.resource.aws_security_group.attrs.egress.def,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 0,
            definition: defs.resource.aws_security_group.attrs.egress.attrs.from_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 0,
            definition: defs.resource.aws_security_group.attrs.egress.attrs.to_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: '-1',
            definition: defs.resource.aws_security_group.attrs.egress.attrs.protocol.def,
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'Array',
            value: ['0.0.0.0/0'],
            definition: defs.resource.aws_security_group.attrs.egress.attrs.cidr_blocks.def,
          }),
          new TerraformComponentAttribute({
            name: 'ipv6_cidr_blocks',
            type: 'Array',
            value: ['::/0'],
            definition: defs.resource.aws_security_group.attrs.egress.attrs.ipv6_cidr_blocks.def,
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Object',
        isDynamic: true,
        definition: defs.resource.aws_security_group.attrs.ingress.def,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 22,
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.from_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 22,
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.to_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: 'tcp',
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.protocol.def,
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'String',
            value: 'var.lb_allowed_cidr',
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.cidr_blocks.def,
          }),
        ],
      }),

    ],
  }),
  new TerraformComponent({
    id: 'id_18',
    externalId: 'cms_backend_secgroup',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_security_group.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms_backend_secgroup',
        definition: defs.resource.aws_security_group.attrs.name.def,
      }),
      new TerraformComponentAttribute({
        name: 'description',
        type: 'String',
        value: 'Default Rules for the CMS Back-End servers',
        definition: defs.resource.aws_security_group.attrs.description.def,
      }),
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'Array',
        value: ['id_5'],
        definition: defs.resource.aws_security_group.attrs.vpc_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Object',
        isDynamic: true,
        definition: defs.resource.aws_security_group.attrs.ingress.def,
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
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.from_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 3306,
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.to_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: 'tcp',
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.protocol.def,
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'Array',
            value: ['aws_vpc.cms_main_vpc.cidr_block'],
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.cidr_blocks.def,
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'egress',
        type: 'Object',
        isDynamic: true,
        definition: defs.resource.aws_security_group.attrs.egress.def,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 0,
            definition: defs.resource.aws_security_group.attrs.egress.attrs.from_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 0,
            definition: defs.resource.aws_security_group.attrs.egress.attrs.to_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: '-1',
            definition: defs.resource.aws_security_group.attrs.egress.attrs.protocol.def,
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'Array',
            value: ['0.0.0.0/0'],
            definition: defs.resource.aws_security_group.attrs.egress.attrs.cidr_blocks.def,
          }),
          new TerraformComponentAttribute({
            name: 'ipv6_cidr_blocks',
            type: 'Array',
            value: ['::/0'],
            definition: defs.resource.aws_security_group.attrs.egress.attrs.ipv6_cidr_blocks.def,
          }),
        ],
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_19',
    externalId: 'cms_lb_secgroup',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_security_group.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms_lb_secgroup',
        definition: defs.resource.aws_security_group.attrs.name.def,
      }),
      new TerraformComponentAttribute({
        name: 'description',
        type: 'String',
        value: 'Default Rules for the CMS LoadBalancer',
        definition: defs.resource.aws_security_group.attrs.description.def,
      }),
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'Array',
        value: ['id_5'],
        definition: defs.resource.aws_security_group.attrs.vpc_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Object',
        isDynamic: true,
        definition: defs.resource.aws_security_group.attrs.ingress.def,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 443,
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.from_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 443,
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.to_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: 'tcp',
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.protocol.def,
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'String',
            value: 'var.lb_allowed_cidr',
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.cidr_blocks.def,
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'ingress',
        type: 'Object',
        isDynamic: true,
        definition: defs.resource.aws_security_group.attrs.ingress.def,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 80,
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.from_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 80,
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.to_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: 'tcp',
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.protocol.def,
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'String',
            value: 'var.lb_allowed_cidr',
            definition: defs.resource.aws_security_group.attrs.ingress.attrs.cidr_blocks.def,
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'egress',
        type: 'Object',
        isDynamic: true,
        definition: defs.resource.aws_security_group.attrs.egress.def,
        value: [
          new TerraformComponentAttribute({
            name: 'from_port',
            type: 'Number',
            value: 0,
            definition: defs.resource.aws_security_group.attrs.egress.attrs.from_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'to_port',
            type: 'Number',
            value: 0,
            definition: defs.resource.aws_security_group.attrs.egress.attrs.to_port.def,
          }),
          new TerraformComponentAttribute({
            name: 'protocol',
            type: 'String',
            value: '-1',
            definition: defs.resource.aws_security_group.attrs.egress.attrs.protocol.def,
          }),
          new TerraformComponentAttribute({
            name: 'cidr_blocks',
            type: 'Array',
            value: ['0.0.0.0/0'],
            definition: defs.resource.aws_security_group.attrs.egress.attrs.cidr_blocks.def,
          }),
        ],
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_20',
    externalId: 'cms_lb_logs_bucket',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_s3_bucket.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'bucket',
        type: 'String',
        value: 'cmslblogsbucket',
        definition: defs.resource.aws_s3_bucket.attrs.bucket.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_21',
    externalId: 'cms_lb_logs_bucket_acl',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_s3_bucket_acl.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'bucket',
        type: 'Array',
        value: ['id_20'],
        definition: defs.resource.aws_s3_bucket_acl.attrs.bucket.def,
      }),
      new TerraformComponentAttribute({
        name: 'acl',
        type: 'String',
        value: 'private',
        definition: defs.resource.aws_s3_bucket_acl.attrs.acl.def,
      }),
    ],
  }),

  new TerraformComponent({
    id: 'id_22',
    externalId: 'cms_frontend_lb',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_lb.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms-frontend-lb',
        definition: defs.resource.aws_lb.attrs.name.def,
      }),
      new TerraformComponentAttribute({
        name: 'internal',
        type: 'Boolean',
        value: false,
        definition: defs.resource.aws_lb.attrs.internal.def,
      }),
      new TerraformComponentAttribute({
        name: 'load_balancer_type',
        type: 'String',
        value: 'application',
        definition: defs.resource.aws_lb.attrs.load_balancer_type.def,
      }),
      new TerraformComponentAttribute({
        name: 'security_groups',
        type: 'Array',
        value: ['id_19'],
        definition: defs.resource.aws_lb.attrs.security_groups.def,
      }),
      new TerraformComponentAttribute({
        name: 'subnets',
        type: 'Array',
        value: ['id_10', 'id_11'],
        definition: defs.resource.aws_lb.attrs.subnets.def,
      }),
      new TerraformComponentAttribute({
        name: 'enable_deletion_protection',
        type: 'Boolean',
        value: true,
        definition: defs.resource.aws_lb.attrs.enable_deletion_protection.def,
      }),
      new TerraformComponentAttribute({
        name: 'access_logs',
        type: 'Object',
        isDynamic: true,
        definition: defs.resource.aws_lb.attrs.access_logs.def,
        value: [
          new TerraformComponentAttribute({
            name: 'bucket',
            type: 'Array',
            value: ['id_20'],
            definition: defs.resource.aws_lb.attrs.access_logs.attrs.bucket.def,
          }),
          new TerraformComponentAttribute({
            name: 'prefix',
            type: 'String',
            value: 'lb-logs-',
            definition: defs.resource.aws_lb.attrs.access_logs.attrs.prefix.def,
          }),
          new TerraformComponentAttribute({
            name: 'enabled',
            type: 'Boolean',
            value: false,
            definition: defs.resource.aws_lb.attrs.access_logs.attrs.enabled.def,
          }),
        ],
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_23',
    externalId: 'cms_lb_target',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_lb_target_group.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cmslbtarget',
        definition: defs.resource.aws_lb_target_group.attrs.name.def,
      }),
      new TerraformComponentAttribute({
        name: 'target_type',
        type: 'String',
        value: 'instance',
        definition: defs.resource.aws_lb_target_group.attrs.target_type.def,
      }),
      new TerraformComponentAttribute({
        name: 'port',
        type: 'Number',
        value: 8000,
        definition: defs.resource.aws_lb_target_group.attrs.port.def,
      }),
      new TerraformComponentAttribute({
        name: 'protocol',
        type: 'String',
        value: 'HTTP',
        definition: defs.resource.aws_lb_target_group.attrs.protocol.def,
      }),
      new TerraformComponentAttribute({
        name: 'vpc_id',
        type: 'Array',
        value: ['id_5'],
        definition: defs.resource.aws_lb_target_group.attrs.vpc_id.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_24',
    externalId: 'cms_launch_conf',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_launch_configuration.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name_prefix',
        type: 'String',
        value: 'web-',
        definition: defs.resource.aws_launch_configuration.attrs.name_prefix.def,
      }),
      new TerraformComponentAttribute({
        name: 'image_id',
        type: 'Array',
        value: ['id_2'],
        definition: defs.resource.aws_launch_configuration.attrs.image_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'instance_type',
        type: 'String',
        value: 'var.ec2_frontend_sku',
        definition: defs.resource.aws_launch_configuration.attrs.instance_type.def,
      }),
      new TerraformComponentAttribute({
        name: 'security_groups',
        type: 'Array',
        value: ['id_17'],
        definition: defs.resource.aws_launch_configuration.attrs.security_groups.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_25',
    externalId: 'cms_asg',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_autoscaling_group.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms-asg',
        definition: defs.resource.aws_autoscaling_group.attrs.name.def,
      }),
      new TerraformComponentAttribute({
        name: 'min_size',
        type: 'Number',
        value: 1,
        definition: defs.resource.aws_autoscaling_group.attrs.min_size.def,
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
        definition: defs.resource.aws_autoscaling_group.attrs.max_size.def,
      }),
      new TerraformComponentAttribute({
        name: 'health_check_type',
        type: 'String',
        value: 'ELB',
        definition: defs.resource.aws_autoscaling_group.attrs.health_check_type.def,
      }),
      new TerraformComponentAttribute({
        name: 'target_group_arns',
        type: 'Array',
        value: ['aws_lb_target_group.cms_lb_target.arn'],
        definition: defs.resource.aws_autoscaling_group.attrs.target_group_arns.def,
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
  new TerraformComponent({
    id: 'id_26',
    externalId: 'cms_policy_up',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_autoscaling_policy.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'web_policy_up',
        definition: defs.resource.aws_autoscaling_policy.attrs.name.def,
      }),
      new TerraformComponentAttribute({
        name: 'scaling_adjustment',
        type: 'Number',
        value: 1,
        definition: defs.resource.aws_autoscaling_policy.attrs.scaling_adjustment.def,
      }),
      new TerraformComponentAttribute({
        name: 'adjustment_type',
        type: 'String',
        value: 'ChangeInCapacity',
        definition: defs.resource.aws_autoscaling_policy.attrs.adjustment_type.def,
      }),
      new TerraformComponentAttribute({
        name: 'cooldown',
        type: 'Number',
        value: 300,
        definition: defs.resource.aws_autoscaling_policy.attrs.cooldown.def,
      }),
      new TerraformComponentAttribute({
        name: 'autoscaling_group_name',
        type: 'Array',
        value: ['id_25'],
        definition: defs.resource.aws_autoscaling_policy.attrs.autoscaling_group_name.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_27',
    externalId: 'cms_cpu_alarm_up',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_cloudwatch_metric_alarm.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'alarm_name',
        type: 'String',
        value: 'cms_cpu_alarm_up',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.alarm_name.def,
      }),
      new TerraformComponentAttribute({
        name: 'comparison_operator',
        type: 'String',
        value: 'GreaterThanOrEqualToThreshold',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.comparison_operator.def,
      }),
      new TerraformComponentAttribute({
        name: 'evaluation_periods',
        type: 'String',
        value: '2',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.evaluation_periods.def,
      }),
      new TerraformComponentAttribute({
        name: 'metric_name',
        type: 'String',
        value: 'CPUUtilization',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.metric_name.def,
      }),
      new TerraformComponentAttribute({
        name: 'namespace',
        type: 'String',
        value: 'AWS/EC2',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.namespace.def,
      }),
      new TerraformComponentAttribute({
        name: 'period',
        type: 'String',
        value: '120',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.period.def,
      }),
      new TerraformComponentAttribute({
        name: 'statistic',
        type: 'String',
        value: 'Average',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.statistic.def,
      }),
      new TerraformComponentAttribute({
        name: 'threshold',
        type: 'String',
        value: '85',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.threshold.def,
      }),
      new TerraformComponentAttribute({
        name: 'dimensions',
        type: 'Object',
        isDynamic: false,
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.dimensions.def,
        value: [
          new TerraformComponentAttribute({
            name: 'AutoScalingGroupName',
            type: 'Array',
            value: ['id_25'],
            definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.dimensions.attrs
              .AutoScalingGroupName.def,
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'alarm_description',
        type: 'String',
        value: 'This metric monitor EC2 instance CPU utilization',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.alarm_description.def,
      }),
      new TerraformComponentAttribute({
        name: 'alarm_actions',
        type: 'Array',
        value: ['aws_autoscaling_policy.cms_policy_up.arn'],
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.alarm_actions.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_28',
    externalId: 'cms_policy_down',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_autoscaling_policy.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms_policy_down',
        definition: defs.resource.aws_autoscaling_policy.attrs.name.def,
      }),
      new TerraformComponentAttribute({
        name: 'scaling_adjustment',
        type: 'Number',
        value: -1,
        definition: defs.resource.aws_autoscaling_policy.attrs.scaling_adjustment.def,
      }),
      new TerraformComponentAttribute({
        name: 'adjustment_type',
        type: 'String',
        value: 'ChangeInCapacity',
        definition: defs.resource.aws_autoscaling_policy.attrs.adjustment_type.def,
      }),
      new TerraformComponentAttribute({
        name: 'cooldown',
        type: 'Number',
        value: 300,
        definition: defs.resource.aws_autoscaling_policy.attrs.cooldown.def,
      }),
      new TerraformComponentAttribute({
        name: 'autoscaling_group_name',
        type: 'Array',
        value: ['id_25'],
        definition: defs.resource.aws_autoscaling_policy.attrs.autoscaling_group_name.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_29',
    externalId: 'cms_cpu_alarm_down',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_cloudwatch_metric_alarm.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'alarm_name',
        type: 'String',
        value: 'cms_cpu_alarm_down',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.alarm_name.def,
      }),
      new TerraformComponentAttribute({
        name: 'comparison_operator',
        type: 'String',
        value: 'LessThanOrEqualToThreshold',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.comparison_operator.def,
      }),
      new TerraformComponentAttribute({
        name: 'evaluation_periods',
        type: 'String',
        value: '2',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.evaluation_periods.def,
      }),
      new TerraformComponentAttribute({
        name: 'metric_name',
        type: 'String',
        value: 'CPUUtilization',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.metric_name.def,
      }),
      new TerraformComponentAttribute({
        name: 'namespace',
        type: 'String',
        value: 'AWS/EC2',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.namespace.def,
      }),
      new TerraformComponentAttribute({
        name: 'period',
        type: 'String',
        value: '120',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.period.def,
      }),
      new TerraformComponentAttribute({
        name: 'statistic',
        type: 'String',
        value: 'Average',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.statistic.def,
      }),
      new TerraformComponentAttribute({
        name: 'threshold',
        type: 'String',
        value: '30',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.threshold.def,
      }),
      new TerraformComponentAttribute({
        name: 'dimensions',
        type: 'Object',
        isDynamic: false,
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.dimensions.def,
        value: [
          new TerraformComponentAttribute({
            name: 'AutoScalingGroupName',
            type: 'Array',
            value: ['id_25'],
            definition: defs.resource.aws_cloudwatch_metric_alarm.attrs
              .dimensions.attrs.AutoScalingGroupName.def,
          }),
        ],
      }),
      new TerraformComponentAttribute({
        name: 'alarm_description',
        type: 'String',
        value: 'This metric monitor EC2 instance CPU utilization',
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.alarm_description.def,
      }),
      new TerraformComponentAttribute({
        name: 'alarm_actions',
        type: 'Array',
        value: ['aws_autoscaling_policy.cms_policy_down.arn'],
        definition: defs.resource.aws_cloudwatch_metric_alarm.attrs.alarm_actions.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_30',
    externalId: 'cms_fileshare',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_efs_file_system.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'tags',
        type: 'Object',
        isDynamic: false,
        definition: defs.resource.aws_efs_file_system.attrs.tags.def,
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
  new TerraformComponent({
    id: 'id_31',
    externalId: 'cms_lb_listener',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_lb_listener.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'load_balancer_arn',
        type: 'Array',
        value: ['id_22'],
        definition: defs.resource.aws_lb_listener.attrs.load_balancer_arn.def,
      }),
      new TerraformComponentAttribute({
        name: 'port',
        type: 'String',
        value: '80',
        definition: defs.resource.aws_lb_listener.attrs.port.def,
      }),
      new TerraformComponentAttribute({
        name: 'protocol',
        type: 'String',
        value: 'HTTP',
        definition: defs.resource.aws_lb_listener.attrs.protocol.def,
      }),
      new TerraformComponentAttribute({
        name: 'default_action',
        type: 'Object',
        isDynamic: true,
        definition: defs.resource.aws_lb_listener.attrs.default_action.def,
        value: [
          new TerraformComponentAttribute({
            name: 'type',
            type: 'String',
            value: 'forward',
            definition: defs.resource.aws_lb_listener.attrs.default_action.attrs.type.def,
          }),
          new TerraformComponentAttribute({
            name: 'target_group_arn',
            type: 'Array',
            value: ['id_23'],
            definition: defs.resource.aws_lb_listener.attrs.default_action.attrs
              .target_group_arn.def,
          }),
        ],
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_32',
    externalId: 'cms_fileshare_mount',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_efs_mount_target.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'file_system_id',
        type: 'Array',
        value: ['id_30'],
        definition: defs.resource.aws_efs_mount_target.attrs.file_system_id.def,
      }),
      new TerraformComponentAttribute({
        name: 'subnet_id',
        type: 'Array',
        value: ['id_6'],
        definition: defs.resource.aws_efs_mount_target.attrs.subnet_id.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_33',
    externalId: 'cms_db_subnets',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_db_subnet_group.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'name',
        type: 'String',
        value: 'cms-db-main-subnets',
      }),
      new TerraformComponentAttribute({
        name: 'subnet_ids',
        type: 'Array',
        definition: defs.resource.aws_db_subnet_group.attrs.subnet_ids.def,
        value: ['id_14', 'id_15'],
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_34',
    externalId: 'cms_db_username',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.random_string.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'length',
        type: 'Number',
        value: 8,
        definition: defs.resource.random_string.attrs.length.def,
      }),
      new TerraformComponentAttribute({
        name: 'special',
        type: 'Boolean',
        value: false,
        definition: defs.resource.random_string.attrs.special.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_35',
    externalId: 'cms_db_passwd',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.random_password.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'length',
        type: 'Number',
        value: 16,
        definition: defs.resource.random_password.attrs.length.def,
      }),
      new TerraformComponentAttribute({
        name: 'special',
        type: 'Boolean',
        value: true,
        definition: defs.resource.random_password.attrs.special.def,
      }),
      new TerraformComponentAttribute({
        name: 'override_special',
        type: 'String',
        value: '!$%&*()-_ =+',
        definition: defs.resource.random_password.attrs.override_special.def,
      }),
    ],
  }),
  new TerraformComponent({
    id: 'id_36',
    externalId: 'cms_db',
    name: null,
    path: 'new_file.tf',
    definition: defs.resource.aws_db_instance.def,
    attributes: [
      new TerraformComponentAttribute({
        name: 'allocated_storage',
        type: 'Number',
        value: 10,
        definition: defs.resource.aws_db_instance.attrs.allocated_storage.def,
      }),
      new TerraformComponentAttribute({
        name: 'db_name',
        type: 'String',
        value: 'cmsdbmain',
        definition: defs.resource.aws_db_instance.attrs.db_name.def,
      }),
      new TerraformComponentAttribute({
        name: 'engine',
        type: 'Array',
        value: ['id_3'],
        definition: defs.resource.aws_db_instance.attrs.engine.def,
      }),
      new TerraformComponentAttribute({
        name: 'vpc_security_group_ids',
        type: 'Array',
        value: ['id_18'],
        definition: defs.resource.aws_db_instance.attrs.vpc_security_group_ids.def,
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
        definition: defs.resource.aws_db_instance.attrs.instance_class.def,
      }),
      new TerraformComponentAttribute({
        name: 'db_subnet_group_name',
        type: 'Array',
        value: ['id_33'],
        definition: defs.resource.aws_db_instance.attrs.db_subnet_group_name.def,
      }),
      new TerraformComponentAttribute({
        name: 'username',
        type: 'String',
        value: 'random_string.cms_db_username.result',
        definition: defs.resource.aws_db_instance.attrs.username.def,
      }),
      new TerraformComponentAttribute({
        name: 'password',
        type: 'String',
        value: 'random_password.cms_db_passwd.result',
        definition: defs.resource.aws_db_instance.attrs.password.def,
      }),
      new TerraformComponentAttribute({
        name: 'skip_final_snapshot',
        type: 'Boolean',
        value: true,
        definition: defs.resource.aws_db_instance.attrs.skip_final_snapshot.def,
      }),
      new TerraformComponentAttribute({
        name: 'publicly_accessible',
        type: 'Boolean',
        value: false,
        definition: defs.resource.aws_db_instance.attrs.publicly_accessible.def,
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
