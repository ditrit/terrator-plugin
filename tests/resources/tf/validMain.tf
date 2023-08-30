provider "aws" {
    region = "eu-west-3"
    access_key = "ACCESS_KEY"
    secret_key = "SECRET_KEY"
    default_tags {
        tags = {
            project_tag = var.project_tag
        }
    }
}

data "aws_ami" "ubuntu" {
    most_recent = true
    filter {
        name = "name"
        values = [
            "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*",
        ]
    }
    filter {
        name = "virtualization-type"
        values = [
            "hvm",
        ]
    }
    owners = [
        "099720109477",
    ]
}

data "aws_rds_engine_version" "cms_db_version" {
    engine = "mariadb"
    default_only = true
}

data "aws_availability_zones" "available" {
    state = "available"
}

resource "aws_vpc" "cms_main_vpc" {
    cidr_block = var.vpc_network_cidr
    instance_tenancy = "default"
}

resource "aws_subnet" "cms_frontend_subnet_az1" {
    vpc_id = aws_vpc.cms_main_vpc
    cidr_block = var.vpc_frontend_cidr_az1
    tags = {
        Name = "cms_frontend_subnet_az1"
    }
}

resource "aws_subnet" "cms_frontend_subnet_az2" {
    vpc_id = aws_vpc.cms_main_vpc
    cidr_block = var.vpc_frontend_cidr_az2
    tags = {
        Name = "cms_frontend_subnet_az2"
    }
}

resource "aws_internet_gateway" "cms_internet_gw" {
    vpc_id = aws_vpc.cms_main_vpc
    tags = {
        Name = "Main CMS VPC - Internet Gateway"
    }
}

resource "aws_route_table" "cms_routing_tbl" {
    vpc_id = aws_vpc.cms_main_vpc
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.cms_internet_gw
    }
    tags = {
        Name = "Public Subnet Route Table"
    }
}

resource "aws_subnet" "cms_lb_subnet_az1" {
    vpc_id = aws_vpc.cms_main_vpc
    cidr_block = var.vpc_lb_cidr_az1
    tags = {
        Name = "cms_lb_subnet_az1"
    }
}

resource "aws_subnet" "cms_lb_subnet_az2" {
    vpc_id = aws_vpc.cms_main_vpc
    cidr_block = var.vpc_lb_cidr_az2
    tags = {
        Name = "cms_lb_subnet_az2"
    }
}

resource "aws_route_table_association" "cms_lb_subnet_az1_gw_assoc" {
    subnet_id = [
        aws_subnet.cms_lb_subnet_az1.id,
    ]
    route_table_id = [
        aws_route_table.cms_routing_tbl.id,
    ]
}

resource "aws_route_table_association" "cms_lb_subnet_az2_gw_assoc" {
    subnet_id = [
        aws_subnet.cms_lb_subnet_az2.id,
    ]
    route_table_id = [
        aws_route_table.cms_routing_tbl.id,
    ]
}

resource "aws_subnet" "cms_backend_subnet_az1" {
    vpc_id = aws_vpc.cms_main_vpc
    cidr_block = var.vpc_backend_cidr_az1
    availability_zone = data.aws_availability_zones.available.names[0]
    tags = {
        Name = "cms_backend_subnet_az1"
    }
}

resource "aws_subnet" "cms_backend_subnet_az2" {
    vpc_id = aws_vpc.cms_main_vpc
    cidr_block = var.vpc_backend_cidr_az2
    availability_zone = data.aws_availability_zones.available.names[1]
    tags = {
        Name = "cms_backend_subnet_az2"
    }
}

resource "aws_subnet" "cms_dmz_subnet" {
    vpc_id = aws_vpc.cms_main_vpc
    cidr_block = var.vpc_dmz_cidr
    tags = {
        Name = "cms_dmz_subnet"
    }
}

resource "aws_security_group" "cms_frontend_secgroup" {
    name = "cms_frontend_secgroup"
    description = "Default Rules for the CMS Front-End servers"
    vpc_id = [
        aws_vpc.cms_main_vpc.id,
    ]
    ingress {
        description = "HTTP from VPC"
        from_port = 8000
        to_port = 8000
        protocol = "tcp"
        cidr_blocks = [
            aws_vpc.cms_main_vpc.cidr_block,
        ]
    }
    ingress {
        description = "NFS from VPC"
        from_port = 2049
        to_port = 2049
        protocol = "tcp"
        cidr_blocks = [
            aws_vpc.cms_main_vpc.cidr_block,
        ]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = [
            "0.0.0.0/0",
        ]
        ipv6_cidr_blocks = [
            "::/0",
        ]
    }
    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = var.lb_allowed_cidr
    }
}

resource "aws_security_group" "cms_backend_secgroup" {
    name = "cms_backend_secgroup"
    description = "Default Rules for the CMS Back-End servers"
    vpc_id = [
        aws_vpc.cms_main_vpc.id,
    ]
    ingress {
        description = "MySQL from VPC"
        from_port = 3306
        to_port = 3306
        protocol = "tcp"
        cidr_blocks = [
            aws_vpc.cms_main_vpc.cidr_block,
        ]
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = [
            "0.0.0.0/0",
        ]
        ipv6_cidr_blocks = [
            "::/0",
        ]
    }
}

resource "aws_security_group" "cms_lb_secgroup" {
    name = "cms_lb_secgroup"
    description = "Default Rules for the CMS LoadBalancer"
    vpc_id = [
        aws_vpc.cms_main_vpc.id,
    ]
    ingress {
        from_port = 443
        to_port = 443
        protocol = "tcp"
        cidr_blocks = var.lb_allowed_cidr
    }
    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = var.lb_allowed_cidr
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = [
            "0.0.0.0/0",
        ]
    }
}

resource "aws_s3_bucket" "cms_lb_logs_bucket" {
    bucket = "cmslblogsbucket"
}

resource "aws_s3_bucket_acl" "cms_lb_logs_bucket_acl" {
    bucket = [
        aws_s3_bucket.cms_lb_logs_bucket.id,
    ]
    acl = "private"
}

resource "aws_lb" "cms_frontend_lb" {
    name = "cms-frontend-lb"
    internal = false
    load_balancer_type = "application"
    security_groups = [
        aws_security_group.cms_lb_secgroup.id,
    ]
    subnets = [
        aws_subnet.cms_lb_subnet_az1.id,
        aws_subnet.cms_lb_subnet_az2.id,
    ]
    enable_deletion_protection = true
    access_logs {
        bucket = [
            aws_s3_bucket.cms_lb_logs_bucket.id,
        ]
        prefix = "lb-logs-"
        enabled = false
    }
}

resource "aws_lb_target_group" "cms_lb_target" {
    name = "cmslbtarget"
    target_type = "instance"
    port = 8000
    protocol = "HTTP"
    vpc_id = [
        aws_vpc.cms_main_vpc.id,
    ]
}

resource "aws_launch_configuration" "cms_launch_conf" {
    name_prefix = "web-"
    image_id = [
        aws_ami.aws_ami.id,
    ]
    instance_type = var.ec2_frontend_sku
    security_groups = [
        aws_security_group.cms_frontend_secgroup.id,
    ]
}

resource "aws_autoscaling_group" "cms_asg" {
    name = "cms-asg"
    min_size = 1
    desired_capacity = 1
    max_size = 2
    health_check_type = "ELB"
    target_group_arns = [
        aws_lb_target_group.cms_lb_target.arn,
    ]
    launch_configuration = aws_launch_configuration.cms_launch_conf.name
    vpc_zone_identifier = [
        aws_subnet.cms_frontend_subnet_az1.id,
        aws_subnet.cms_frontend_subnet_az2.id,
    ]
    lifecycle {
        create_before_destroy = true
    }
}

resource "aws_autoscaling_policy" "cms_policy_up" {
    name = "web_policy_up"
    scaling_adjustment = 1
    adjustment_type = "ChangeInCapacity"
    cooldown = 300
    autoscaling_group_name = [
        aws_autoscaling_group.cms_asg.id,
    ]
}

resource "aws_cloudwatch_metric_alarm" "cms_cpu_alarm_up" {
    alarm_name = "cms_cpu_alarm_up"
    comparison_operator = "GreaterThanOrEqualToThreshold"
    evaluation_periods = "2"
    metric_name = "CPUUtilization"
    namespace = "AWS/EC2"
    period = "120"
    statistic = "Average"
    threshold = "85"
    dimensions = {
        AutoScalingGroupName = [
            aws_autoscaling_group.cms_asg.id,
        ]
    }
    alarm_description = "This metric monitor EC2 instance CPU utilization"
    alarm_actions = [
        aws_autoscaling_policy.cms_policy_up.arn,
    ]
}

resource "aws_autoscaling_policy" "cms_policy_down" {
    name = "cms_policy_down"
    scaling_adjustment = -1
    adjustment_type = "ChangeInCapacity"
    cooldown = 300
    autoscaling_group_name = [
        aws_autoscaling_group.cms_asg.id,
    ]
}

resource "aws_cloudwatch_metric_alarm" "cms_cpu_alarm_down" {
    alarm_name = "cms_cpu_alarm_down"
    comparison_operator = "LessThanOrEqualToThreshold"
    evaluation_periods = "2"
    metric_name = "CPUUtilization"
    namespace = "AWS/EC2"
    period = "120"
    statistic = "Average"
    threshold = "30"
    dimensions = {
        AutoScalingGroupName = [
            aws_autoscaling_group.cms_asg.id,
        ]
    }
    alarm_description = "This metric monitor EC2 instance CPU utilization"
    alarm_actions = [
        aws_autoscaling_policy.cms_policy_down.arn,
    ]
}

resource "aws_efs_file_system" "cms_fileshare" {
    tags = {
        Name = "cms_fileshare"
    }
}

resource "aws_lb_listener" "cms_lb_listener" {
    load_balancer_arn = [
        aws_lb.cms_frontend_lb.id,
    ]
    port = "80"
    protocol = "HTTP"
    default_action {
        type = "forward"
        target_group_arn = [
            aws_lb_target_group.cms_lb_target.id,
        ]
    }
}

resource "aws_efs_mount_target" "cms_fileshare_mount" {
    file_system_id = [
        aws_efs_file_system.cms_fileshare.id,
    ]
    subnet_id = [
        aws_subnet.cms_frontend_subnet_az1.id,
    ]
}

resource "aws_db_subnet_group" "cms_db_subnets" {
    name = "cms-db-main-subnets"
    subnet_ids = [
        aws_subnet.cms_backend_subnet_az1.id,
        aws_subnet.cms_backend_subnet_az2.id,
    ]
}

resource "random_string" "cms_db_username" {
    length = 8
    special = false
}

resource "random_password" "cms_db_passwd" {
    length = 16
    special = true
    override_special = "!$%&*()-_ =+"
}

resource "aws_db_instance" "cms_db" {
    allocated_storage = 10
    db_name = "cmsdbmain"
    engine = [
        aws_rds_engine_version.aws_rds_engine_version.id,
    ]
    vpc_security_group_ids = [
        aws_security_group.cms_backend_secgroup.id,
    ]
    engine_version = data.aws_rds_engine_version.cms_db_version.version
    instance_class = var.rds_sku
    db_subnet_group_name = [
        aws_db_subnet_group.cms_db_subnets.name,
    ]
    username = random_string.cms_db_username.result
    password = random_password.cms_db_passwd.result
    skip_final_snapshot = true
    publicly_accessible = false
}

variable "project_tag" {
    default = "orness-autoscaled-cms"
    type = string
}

variable "project_region" {
    default = "eu-west-3"
    type = string
}

variable "vpc_network_cidr" {
    default = "10.0.0.0/16"
    type = string
}

variable "vpc_frontend_cidr_az1" {
    default = "10.0.1.0/24"
    type = string
}

variable "vpc_frontend_cidr_az2" {
    default = "10.0.2.0/24"
    type = string
}

variable "vpc_lb_cidr_az1" {
    default = "10.0.3.0/24"
    type = string
}

variable "vpc_lb_cidr_az2" {
    default = "10.0.4.0/24"
    type = string
}

variable "vpc_backend_cidr_az1" {
    default = "10.0.5.0/24"
    type = string
}

variable "vpc_backend_cidr_az2" {
    default = "10.0.6.0/24"
    type = string
}

variable "lb_allowed_cidr" {
    default = [
        "176.136.249.31/32",
    ]
    type = list(any)
}

variable "vpc_dmz_cidr" {
    default = "10.0.101.0/24"
    type = string
}

variable "ec2_frontend_sku" {
    default = "t3.micro"
    type = string
}

variable "ec2_frontend_count" {
    default = 2
    type = number
}

variable "rds_sku" {
    default = "db.t3.micro"
    type = string
}
