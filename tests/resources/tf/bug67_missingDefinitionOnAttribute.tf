resource "aws_elb" "aws_elb_1" {
    listener = {
        instance_port = "1"
    }
}

resource "resourcea" "b" {
  listener = {
    instance_port = 1
    otherObject = {
      otherAttribute = 2
    }
  }
}
