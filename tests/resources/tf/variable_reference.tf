resource "aws_db_instance" "database" {
    instance_class = var.instance_class
}

variable "instance_class" {
    default = "db.t3.micro"
    type = string
    description = "The instance class to use"
    sensitive = true
    nullable = true
}
