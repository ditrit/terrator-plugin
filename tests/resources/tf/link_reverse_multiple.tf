resource "parent" "parent_reverse_multiple_1" {
    name = "parent_reverse_multiple_1"
    fromChild = ["child_reverse_multiple_1","child_reverse_multiple_2"]
}

resource "child" "child_reverse_multiple_1" {
    name = "child_reverse_multiple_1"
}

resource "child" "child_reverse_multiple_2" {
    name = "child_reverse_multiple_2"
}
