resource "aws_security_group" "security_group_1" {
}

resource "aws_security_group" "security_group_2" {
}

resource "aws_db_instance" "db_instance" {
    vpc_security_group_ids = [
        aws_security_group.security_group_1.id,
        aws_security_group.security_group_2.id,
    ]
}
