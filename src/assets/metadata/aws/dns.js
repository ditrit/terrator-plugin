const awsRoute53Zone = {
  type: 'aws_route53_zone',
  blockType: 'resource',
  displayName: 'AWS route 53 zone',
  description: 'A collection of records',
  icon: 'Aws_Route-53-Hosted-Zone',
  isContainer: true,
  model: 'DefaultContainer',
  url: 'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html',
  categories: ['AWS', 'DNS and Routing'],
  tags: [],
  definedAttributes: [
    {
      name: 'name',
      displayName: 'Name',
      description: 'This is the name of the hosted zone.',
      required: true,
      type: 'String',
      containerRef: 'aws_route53_zone',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_zone#name',
    },
    {
      name: 'records',
      displayName: 'Records',
      type: 'Link',
      linkModel: 'defaultLink',
      linkAttribute: 'name',
      linkRef: 'aws_route53_record',
      linkType: 'Default',
    },
  ],
};

const awsRoute53Record = {
  type: 'aws_route53_record',
  blockType: 'resource',
  displayName: 'AWS route 53 record',
  description: 'Create records to tell the DNS how to route traffic for that domain.',
  icon: 'Aws_Route-53_Route-Table',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/rrsets-working-with.html',
  categories: ['AWS', 'DNS and Routing'],
  tags: [],
  definedAttributes: [
    {
      name: 'zone_id',
      displayName: 'Zone ID',
      description: 'The ID of the hosted zone to contain this record.',
      containerRef: 'aws_route53_zone',
      required: true,
      type: 'Reference',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record#zone_id',
    },
    {
      name: 'records',
      displayName: 'Records',
      description: 'A string list of records.',
      linkRef: 'aws_route53_record',
      linkType: 'Default',
      linkModel: 'defaultLink',
      type: 'Link',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/route53_record#records',
    },
  ],
};

export default [
  awsRoute53Zone,
  awsRoute53Record,
];
