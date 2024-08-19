resource "aws_lb_target_group" "test1" {
  load_balancing_algorithm_type = "bad"
}

resource "aws_lb_target_group" "test2" {
  load_balancing_algorithm_type = 1
}

resource "unknown" "test3" {}

resource "aws_lb_target_group" "" {}

blabla "test" {}

provider "aws" {}

resource "aws_lb_listener" "http_lb_listener" {
  load_balancer_arn = [aws_lb.frontend_lb.id]
  default_action {
    type             = "forward"
    target_group_arn = ["lb_target"]
  }
}
