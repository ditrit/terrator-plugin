resource "aws_subnet" "subnet" {
    availability_zone = data.availability_zones.available.names[0]
}
