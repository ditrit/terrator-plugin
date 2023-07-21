resource "aws_vpc" "vpc_test" {
}

resource "aws_subnet" "subnet1" {
    vpc_id = aws_vpc.vpc_test.id
}

resource "aws_subnet" "subnet2" {
    vpc_id = aws_vpc.vpc_test.id
}

resource "aws_db_subnet_group" "db_subnet_group" {
    subnet_ids = [
        aws_subnet.subnet1.id,
        aws_subnet.subnet2.id,
    ]
}
