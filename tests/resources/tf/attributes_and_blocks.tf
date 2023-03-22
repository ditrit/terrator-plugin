resource "aws_security_group" "allow_all" {
    name = "allow_all"
    description = "Allow all inbound traffic"
    ingress {
        from_port = 0
        to_port = 0
        protocol = "-1"
    }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
    }
    tags = {
        Terraform = true
    }
}
