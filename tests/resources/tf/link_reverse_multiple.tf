resource "parent" "parent_reverse_multiple_1" {
    name = "parent_reverse_multiple_1"
    fromChild = [
        child.child_reverse_multiple_1.name,
        child.child_reverse_multiple_2.name,
    ]
}

resource "child" "child_reverse_multiple_1" {
    name = "child_reverse_multiple_1"
}

resource "child" "child_reverse_multiple_2" {
    name = "child_reverse_multiple_2"
}
