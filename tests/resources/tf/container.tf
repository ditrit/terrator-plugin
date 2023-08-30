resource "aws_vpc" "parent" {
    name = "parent"
}

resource "aws_internet_gateway" "child" {
    name = "child"
    vpc_id = aws_vpc.parent
}
