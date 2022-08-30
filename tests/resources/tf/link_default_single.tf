resource "parent" "parent1" {
    name = "parent1"
    toChild = ["child1"]
}

resource "child" "child1" {
    name = "child1"
}
