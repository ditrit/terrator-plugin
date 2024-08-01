resource "aws_lb_target_group" "test1" {
  load_balancing_algorithm_type = "bad"
}

resource "aws_lb_target_group" "test2" {
  load_balancing_algorithm_type = 1
}

resource "unknown" "test3" {}

resource "aws_lb_target_group" "" {}

blabla "test" {}
