resource "parent" "parent_default_multiple_1" {
    name = "parent_default_multiple_1"
    toChild = [
        child.child_default_multiple_1.name,
        child.child_default_multiple_2.name,
    ]
}

resource "child" "child_default_multiple_1" {
    name = "child_default_multiple_1"
}

resource "child" "child_default_multiple_2" {
    name = "child_default_multiple_2"
}
