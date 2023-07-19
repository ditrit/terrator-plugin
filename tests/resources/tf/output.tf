output "instance_ip_addr" {
    value = aws_instance.server.private_ip
    description = "The IP address of the instance"
    sensitive = true
}
