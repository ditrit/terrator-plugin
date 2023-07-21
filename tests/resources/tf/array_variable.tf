locals {
    test_local_string = [
        "a",
        "b",
        "c",
    ]
    test_local_number = [
        1,
        2,
        3,
    ]
    test_local_bool = [
        true,
        false,
        true,
    ]
}

variable "test_variable_string" {
    default = [
        "a",
        "b",
        "c",
    ]
    type = list(string)
}

variable "test_variable_number" {
    default = [
        1,
        2,
        3,
    ]
    type = list(number)
}

variable "test_variable_bool" {
    default = [
        true,
        false,
        true,
    ]
    type = list(bool)
}

output "test_output_string" {
    value = [
        "a",
        "b",
        "c",
    ]
}

output "test_output_number" {
    value = [
        1,
        2,
        3,
    ]
}

output "test_output_bool" {
    value = [
        true,
        false,
        true,
    ]
}
