import TerraformVariable from 'src/models/TerraformVariable';

export default [
  new TerraformVariable({
    name: 'instance_ip_addr',
    value: 'aws_instance.server.private_ip',
    category: 'output',
    path: 'new_file.tf',
    type: 'string',
    description: 'The IP address of the instance',
    sensitive: true,
  }),
];
