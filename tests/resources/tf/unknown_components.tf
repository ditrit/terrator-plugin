resource "unknown_ressource" "id_1" {
    value = "test"
}

module "unknown_module" {
    source = "test"
}
