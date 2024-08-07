import {
  ipv6Address,
  port,
  securityGroups, subnetId,
  tags,
  vpcIdLink,
  vpcIdReference,
} from './default';

const awsElb = {
  type: 'aws_elb',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'AWS ELB',
  description: 'Automatically distributes incoming application traffic across multiple targets and virtual appliances in one or more Availability Zones.',
  icon: 'Aws_Elastic-Load-Balancing_Network-Load-Balancer',
  model: 'DefaultModel',
  url: 'https://aws.amazon.com/elasticloadbalancing/',
  categories: ['AWS', 'Load Balancing'],
  tags: [],
  definedAttributes: [
    {
      name: 'listener',
      displayName: 'Listener',
      description: 'A list of listener blocks. Each listener block supports fields documented below.',
      required: true,
      type: 'Object',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elb#listener',
      definedAttributes: [
        {
          name: 'instance_port',
          displayName: 'Instance port',
          description: 'The port on the instance to route to.',
          required: true,
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elb#instance_port',
        },
        {
          name: 'lb_port',
          displayName: 'LB port',
          description: 'The port to listen on for the load balancer.',
          required: true,
          type: 'Number',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elb#lb_port',
        },
        {
          name: 'lb_protocol',
          displayName: 'LB protocol',
          description: 'The protocol to listen on. Valid values are HTTP, HTTPS, TCP, or SSL.',
          required: true,
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elb#lb_protocol',
        },
        {
          name: 'instance_protocol',
          displayName: 'Instance protocol',
          description: 'The protocol to use to the instance. Valid values are HTTP, HTTPS, TCP, or SSL.',
          required: true,
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elb#instance_protocol',
        },
      ],
    },
    {
      name: 'subnets',
      displayName: 'Subnets',
      description: 'A list of subnet IDs to attach to the ELB.',
      linkAttribute: 'id',
      linkRef: 'aws_subnet',
      linkType: 'Default',
      linkModel: 'defaultLink',
      type: 'Link',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elb#subnets',
    },
    {
      ...securityGroups,
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elb#security_groups',
    },
    {
      name: 'instances',
      displayName: 'Instances',
      description: 'A list of instance ids to place in the ELB pool.',
      linkAttribute: 'id',
      linkRef: 'aws_instance',
      linkType: 'Default',
      linkModel: 'defaultLink',
      type: 'Link',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elb#instances',
    },
  ],
};

const awsLb = {
  type: 'aws_lb',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'Application Load Balancer (LB)',
  description: 'A load balancer serves as the single point of contact for clients. The load balancer distributes incoming application traffic across multiple targets, in multiple Availability Zones.',
  icon: 'Aws_Application-Load-Balancer',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html',
  categories: ['AWS', 'Load Balancing'],
  tags: [],
  definedAttributes: [
    {
      ...vpcIdReference,
      description: 'The ID of the VPC to create the ALB in.',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#vpc_id',
    },
    {
      name: 'name',
      displayName: 'Name',
      description: 'The name of the LB. This name must be unique within your AWS account.<br>If not specified, Terraform will autogenerate a name beginning with tf-lb.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#name',
      rules: {
        regex: '^([a-zA-Z0-9]+-)*[a-zA-Z0-9]+$',
      },
    },
    {
      name: 'internal',
      displayName: 'Internal LB',
      description: 'If true, the LB will be internal.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#internal',
    },
    {
      name: 'load_balancer_type',
      displayName: 'Load balancer type',
      description: 'The type of load balancer to create.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#load_balancer_type',
      rules: {
        values: [
          'application',
          'gateway',
          'network',
        ],
      },
    },
    {
      name: 'access_logs',
      displayName: 'Access logs',
      description: 'An Access Logs block.',
      type: 'Object',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb',
      definedAttributes: [
        {
          name: 'bucket',
          displayName: 'Bucket',
          description: 'The S3 bucket name to store the logs in.',
          linkRef: 'aws_s3_bucket',
          linkType: 'Default',
          linkModel: 'defaultLink',
          type: 'Link',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#bucket',
        },
        {
          name: 'enabled',
          displayName: 'Enabled',
          description: 'Boolean to enable / disable access_logs. Defaults to false, even when bucket is specified.',
          type: 'Boolean',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#enabled',
        },
        {
          name: 'prefix',
          displayName: 'Prefix',
          description: 'The S3 bucket prefix. Logs are stored in the root if not configured.',
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#prefix',
        },
      ],
    },
    {
      name: 'customer_owned_ipv4_pool',
      displayName: 'Customer owned ivp4 pool',
      description: 'The ID of the customer owned ipv4 pool to use for this load balancer.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#customer_owned_ipv4_pool',
    },
    {
      name: 'desync_mitigation_mode',
      displayName: 'Customer owned ivp4 pool',
      description: 'Determines how the load balancer handles requests that might pose a security risk to an application due to HTTP desync.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#desync_mitigation_mode',
      rules: {
        values: [
          'defensive',
          'monitor',
          'strictest',
        ],
      },
    },
    {
      name: 'drop_invalid_header_fields',
      displayName: 'Drop invalid header fields',
      description: 'Indicates whether HTTP headers with header fields that are not valid are removed by the load balancer (true) or routed to targets (false).<br>The default is false. Elastic Load Balancing requires that message header names contain only alphanumeric characters and hyphens. Only valid for Load Balancers of type.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#drop_invalid_header_fields',
    },
    {
      name: 'enable_cross_zone_load_balancing',
      displayName: 'Enable cross zone load balancing',
      description: 'If true, cross-zone load balancing of the load balancer will be enabled. For network and gateway type load balancers, this feature is disabled by default (false).<br>For application load balancer this feature is always enabled (true) and cannot be disabled. Defaults to false.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#enable_cross_zone_load_balancing',
    },
    {
      name: 'enable_deletion_protection',
      displayName: 'Enable deletion protection',
      description: 'If true, deletion of the load balancer will be disabled via the AWS API. This will prevent Terraform from deleting the load balancer. Defaults to false.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#enable_deletion_protection',
    },
    {
      name: 'enable_http2',
      displayName: 'Enable http2',
      description: 'Indicates whether HTTP/2 is enabled in application load balancers. Defaults to true.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#enable_http2',
    },
    {
      name: 'enable_waf_fail_open',
      displayName: 'Enable WAF fail open',
      description: 'Indicates whether to allow a WAF-enabled load balancer to route requests to targets<br>if it is unable to forward the request to AWS WAF. Defaults to false.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#enable_waf_fail_open',
    },
    {
      name: 'idle_timeout',
      displayName: 'Idle timeout',
      description: 'The time in seconds that the connection is allowed to be idle.<br>Only valid for Load Balancers of type application. Default: 60.',
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#idle_timeout',
    },
    {
      name: 'ip_address_type',
      displayName: 'IP address type',
      description: 'The type of IP addresses used by the subnets for your load balancer.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#ip_address_type',
      rules: {
        values: [
          'ipv4',
          'dualstack',
        ],
      },
    },
    {
      ...securityGroups,
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#security_groups',
    },
    {
      name: 'preserve_host_header',
      displayName: 'Preserve host header',
      description: 'Indicates whether the Application Load Balancer should preserve the Host header in the HTTP request <br>and send it to the target without any change. Defaults to false.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#preserve_host_header',
    },
    {
      name: 'subnet_mapping',
      displayName: 'Subnet mapping',
      description: 'A subnet mapping block.',
      type: 'Object',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#subnet_mapping',
      definedAttributes: [
        {
          ...subnetId,
          description: 'ID of the subnet of which to attach to the load balancer. You can specify only one subnet per Availability Zone.',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#subnet_id',
        },
        {
          name: 'allocation_id',
          displayName: 'Allocation ID',
          description: 'The allocation ID of the Elastic IP address for an internet-facing load balancer.',
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#allocation_id',
        },
        {
          ...ipv6Address,
          description: 'The IPv6 address. You associate IPv6 CIDR blocks with your VPC and choose the subnets <br>where you launch both internet-facing and internal Application Load Balancers or Network Load Balancers.',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#ipv6_address',
        },
        {
          name: 'private_ipv4_address',
          displayName: 'Private IPv4 address',
          description: 'The private IPv4 address for an internal load balancer.',
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#private_ipv4_address',
        },
      ],
    },
    {
      name: 'subnets',
      displayName: 'Subnets',
      description: 'A list of subnet IDs to attach to the LB. Subnets cannot be updated for Load Balancers of type network.<br>Changing this value for load balancers of type network will force a recreation of the resource.',
      linkRef: 'aws_subnet',
      linkType: 'Default',
      linkModel: 'defaultLink',
      type: 'Link',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#subnets',
    },
    {
      name: 'name_prefix',
      displayName: 'Name prefix',
      description: 'Creates a unique name beginning with the specified prefix. Conflicts with name.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#name_prefix',
    },
    {
      ...tags,
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb#tags',
    },
  ],
};

const awsLbTargetGroup = {
  type: 'aws_lb_target_group',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'Load balancer target group',
  description: 'Target groups route requests to one or more registered targets, using the protocol and port number that you specify.<br>You can register a target with multiple target groups',
  icon: 'Aws_Application-Load-Balancer-Target-Group',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html',
  categories: ['AWS', 'Load Balancing'],
  tags: [],
  definedAttributes: [
    {
      name: 'connection_termination',
      displayName: 'Connection termination',
      description: 'Whether to terminate connections at the end of the deregistration timeout on Network Load Balancers.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#connection_termination',
    },
    {
      name: 'deregistration_delay',
      displayName: 'Deregistration delay',
      description: 'Amount time for Elastic Load Balancing to wait before changing the state of a deregistering target from draining to unused.',
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#deregistration_delay',
    },
    {
      name: 'lambda_multi_value_headers_enabled',
      displayName: 'Lambda multi value headers enabled',
      description: 'Whether the request and response headers exchanged between the load balancer and the Lambda function include arrays of values or strings.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#lambda_multi_value_headers_enabled',
    },
    {
      name: 'load_balancing_algorithm_type',
      displayName: 'Load balancing algorithm type',
      description: 'Determines how the load balancer selects targets when routing requests.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#load_balancing_algorithm_type',
      rules: {
        values: [
          'round_robin',
          'least_outstanding_requests',
        ],
      },
    },
    {
      name: 'name',
      displayName: 'Name',
      description: 'Name of the target group. If omitted, Terraform will assign a random, unique name.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#name',
    },
    {
      name: 'name_prefix',
      displayName: 'Name prefix',
      description: 'Creates a unique name beginning with the specified prefix.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#name_prefix',
    },
    {
      ...port,
      description: 'Port on which targets receive traffic, unless overridden when registering a specific target.',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#port',
    },
    {
      name: 'preserve_client_ip',
      displayName: 'Preserve client IP',
      description: 'Whether client IP preservation is enabled.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#preserve_client_ip',
    },
    {
      name: 'protocol',
      displayName: 'Protocol',
      description: 'Protocol to use for routing traffic to the targets.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#protocol',
      rules: {
        values: [
          'GENEVE',
          'HTTP',
          'HTTPS',
          'TCP',
          'TCP_UDP',
          'TLS',
          'UDP',
        ],
      },
    },
    {
      name: 'protocol_version',
      displayName: 'Protocol version',
      description: 'Only applicable when protocol is HTTP or HTTPS. The protocol version.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#protocol_version',
    },
    {
      name: 'proxy_protocol_v2',
      displayName: 'Proxy protocol v2',
      description: 'Whether to enable support for proxy protocol v2 on Network Load Balancers.',
      type: 'Boolean',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#proxy_protocol_v2',
    },
    {
      name: 'slow_start',
      displayName: 'Slow start',
      description: 'Amount time for targets to warm up before the load balancer sends them a full share of requests.',
      type: 'Number',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#slow_start',
    },
    {
      name: 'target_type',
      displayName: 'Target type',
      description: 'Type of target that you must specify when registering targets with this target group. The default is "instance".',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#target_type',
    },
    {
      name: 'ip_address_type',
      displayName: 'IP address type',
      description: 'The type of IP addresses used by the target group, only supported when target type is set to ip.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#ip_address_type',
      rules: {
        values: [
          'ipv4',
          'ipv6',
        ],
      },
    },
    {
      ...vpcIdLink,
      description: 'Identifier of the VPC in which to create the target group.',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#vpc_id',
    },
    {
      name: 'health_check',
      displayName: 'Health check',
      description: 'Health Check configuration block.',
      type: 'Object',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#health_check',
      definedAttributes: [
        {
          name: 'enabled',
          displayName: 'Enabled',
          description: 'Whether health checks are enabled.',
          type: 'Boolean',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#enabled',
        },
        {
          name: 'healthy_threshold',
          displayName: 'Healthy threshold',
          description: 'Number of consecutive health check successes required before considering a target healthy.',
          type: 'Number',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#healthy_threshold',
        },
        {
          name: 'interval',
          displayName: 'Interval',
          description: 'Approximate amount of time, in seconds, between health checks of an individual target.',
          type: 'Number',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#interval',
        },
        {
          name: 'matcher',
          displayName: 'Matcher',
          description: 'Response codes to use when checking for a healthy responses from a target.',
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#matcher',
        },
        {
          name: 'path',
          displayName: 'Path',
          description: 'Destination for the health check request.',
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#path',
        },
        {
          ...port,
          description: 'The port the load balancer uses when performing health checks on targets.',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#port',
        },
        {
          name: 'protocol',
          displayName: 'Protocol',
          description: 'The port the load balancer uses when performing health checks on targets.',
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#protocol',
          rules: {
            values: [
              'TCP',
              'HTTP',
              'HTTPS',
            ],
          },
        },
        {
          name: 'timeout',
          displayName: 'Timeout',
          description: 'Amount of time, in seconds, during which no response from a target means a failed health check.',
          type: 'Number',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#timeout',
        },
        {
          name: 'unhealthy_threshold',
          displayName: 'Unhealthy threshold',
          description: 'Number of consecutive health check failures required before considering a target unhealthy.',
          type: 'Number',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#unhealthy_threshold',
        },
      ],
    },
    {
      name: 'stickiness',
      displayName: 'Stickiness',
      description: 'Stickiness configuration block.',
      type: 'Object',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#stickiness',
      definedAttributes: [
        {
          name: 'cookie_duration',
          displayName: 'Cookie duration',
          description: 'The time period, in seconds, during which requests from a client should be routed to the same target.',
          type: 'Number',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#cookie_duration',
        },
        {
          name: 'cookie_name',
          displayName: 'Cookie name',
          description: 'Name of the application based cookie.',
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#cookie_name',
        },
        {
          name: 'enabled',
          displayName: 'Enable stickiness',
          description: 'Boolean to enable/disable stickiness.',
          type: 'Boolean',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#enabled',
        },
        {
          name: 'type',
          displayName: 'Type',
          description: 'The type of sticky sessions.',
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#type',
          rules: {
            values: [
              'lb_cookie',
              'app_cookie',
              'source_ip',
              'source_ip_dest_ip',
              'source_ip_dest_ip_proto',
            ],
          },
        },
      ],
    },
    tags,
    {
      name: 'target_failover',
      displayName: 'Target failover',
      description: 'Target failover block.',
      type: 'Object',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#target_failover',
      definedAttributes: [
        {
          name: 'on_deregistration',
          displayName: 'On deregistration',
          description: 'Indicates how the Gateway Load Balancer (GWLB) handles existing flows when a target is deregistered.',
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#on_deregistration',
          rules: {
            values: [
              'rebalance',
              'no_rebalance',
            ],
          },
        },
        {
          name: 'on_unhealthy',
          displayName: 'On unhealthy',
          description: 'Indicates how the Gateway Load Balancer (GWLB) handles existing flows when a target is unhealthy.',
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_target_group#on_unhealthy',
          rules: {
            values: [
              'rebalance',
              'no_rebalance',
            ],
          },
        },
      ],
    },
  ],
};

const awsLbListener = {
  type: 'aws_lb_listener',
  blockType: 'resource',
  provider: 'aws',
  displayName: 'Load Balancer Listener',
  description: 'Provides a Load Balancer Listener resource.',
  icon: 'Aws_Elastic-Load-Balancing_Network-Load-Balancer',
  model: 'DefaultModel',
  url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html',
  categories: ['AWS', 'Load Balancing'],
  tags: [],
  definedAttributes: [
    {
      name: 'load_balancer_arn',
      displayName: 'Load balancer ARN',
      description: 'ARN of the load balancer.',
      linkRef: 'aws_lb',
      linkType: 'Default',
      linkModel: 'defaultLink',
      required: true,
      type: 'Link',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener#load_balancer_arn',
    },
    {
      name: 'default_action',
      displayName: 'Default action',
      description: 'Configuration block for the default action.',
      required: true,
      type: 'Object',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener#default_action',
      definedAttributes: [
        {
          name: 'type',
          displayName: 'Type',
          description: 'Type of routing action.',
          required: true,
          type: 'String',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener#type',
          rules: {
            values: [
              'forward',
              'authenticate-oidc',
              'authenticate-cognito',
              'redirect',
              'fixed-response',
            ],
          },
        },
        {
          name: 'target_group_arn',
          displayName: 'Target group ARN',
          description: 'ARN of the target group to which to route traffic.',
          linkRef: 'aws_lb_target_group',
          linkType: 'Default',
          linkModel: 'defaultLink',
          type: 'Link',
          url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener#target_group_arn',
        },
      ],
    },
    {
      name: 'certificate_arn',
      displayName: 'Certificate ARN',
      description: 'ARN of the default SSL server certificate.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener#certificate_arn',
    },
    {
      ...port,
      description: 'Port on which the load balancer is listening.',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener#port',
    },
    {
      name: 'protocol',
      displayName: 'Protocol',
      description: 'Protocol for connections from clients to the load balancer.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener#protocol',
      rules: {
        values: [
          'HTTP',
          'HTTPS',
          'TCP',
          'TLS',
          'UDP',
          'TCP_UDP',
        ],
      },
    },
    {
      name: 'alpn_policy',
      displayName: 'ALPN policy',
      description: 'Name of the Application-Layer Protocol Negotiation (ALPN) policy.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener#alpn_policy',
      rules: {
        values: [
          'HTTP1Only',
          'HTTP2Only',
          'HTTP2Optional',
          'HTTP2Preferred',
          'None',
        ],
      },
    },
    {
      name: 'ssl_policy',
      displayName: 'SSL policy',
      description: 'Name of the SSL Policy for the listener.',
      type: 'String',
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener#ssl_policy',
    },
    {
      ...tags,
      url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lb_listener#tags',
    },
  ],
};

export default [
  awsElb,
  awsLb,
  awsLbTargetGroup,
  awsLbListener,
];
