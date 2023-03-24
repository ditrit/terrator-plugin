resource "aws_vpc" "vpc" {
}

resource "aws_subnet" "subnet" {
    vpc_id = aws_vpc.vpc.id
}