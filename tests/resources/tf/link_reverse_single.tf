resource "parent" "parent_reverse_single_1" {
    name = "parent_reverse_single_1"
    fromChild = ["child_reverse_single_1"]
}

resource "child" "child_reverse_single_1" {
    name = "child_reverse_single_1"
}
