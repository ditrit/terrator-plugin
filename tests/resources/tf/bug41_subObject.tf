data "aws_ami" "web" {
    filter {
        name = "state"
        test {
            value = 8
            test2 {
                value = 9
            }
        }
    }
}
