resource "aws_db_subnet_group" "db_subnet_group" {
    name = "Group"
}

resource "aws_db_instance" "db" {
    db_subnet_group_name = [
        aws_db_subnet_group.db_subnet_group.name,
    ]
}
