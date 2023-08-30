resource "parent" "parent_default_single_1" {
    name = "parent_default_single_1"
    toChild = [
        child.child_default_single_1.name,
    ]
}

resource "child" "child_default_single_1" {
    name = "child_default_single_1"
}
