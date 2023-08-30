resource "parent" "parent_reverse_single_1" {
    name = "parent_reverse_single_1"
    fromChild = [
        child.child_reverse_single_1.name,
    ]
}

resource "child" "child_reverse_single_1" {
    name = "child_reverse_single_1"
}
