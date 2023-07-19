locals {
    instance_class = "db.t3.micro"
}

resource "aws_db_instance" "database" {
    instance_class = local.instance_class
}
