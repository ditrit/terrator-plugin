resource "aws_security_group" "test_secgroup" {
    egress {
        from_port = 0
        to_port = 0
    }
    tags = {
        Environment = "Test"
        Name = "test Secgroup"
    }
}
