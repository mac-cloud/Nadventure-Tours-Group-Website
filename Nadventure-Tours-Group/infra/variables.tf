variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure location"
  type        = string
}

variable "service_plan_name" {
  description = "Name of the app service plan"
  type        = string
}

variable "backend_app_service_name" {
  description = "Name of the Django app service"
  type        = string
}

variable "frontend_app_service_name" {
  description = "Name of the frontend app service"
  type        = string
}
variable "storage_account_name" {
  description = "The name of the Azure Storage Account"
  type        = string
  default     = "nadventurestore01"  
}
