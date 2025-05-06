locals {
  service_name = "my_service"
}

module "hello_world_lambda" {
  source       = "./modules/lambda"
  name         = "hello_world"
  service_name = local.service_name
  env          = var.env
}

module "orders_lambda" {
  source       = "./modules/lambda"
  name         = "orders"
  service_name = local.service_name
  env          = var.env
}
