resource "aws_instance" "test" {
    tags {
        name = "test"
        value = 50
    }
    tags = {
        name = "test2"
        value = 60
    }
}
