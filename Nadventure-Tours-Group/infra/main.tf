provider "azurerm" {
  features {}
    subscription_id = "fa6cc43f-392a-440f-9db4-7e57a80b8ab9"
  
}

# Define the resource group
resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

# Define the App Service Plan (for both backend and frontend)
resource "azurerm_service_plan" "app_plan" {
  name                = var.service_plan_name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  os_type                = "Linux"
  sku_name         = "S1"
   timeouts {
    create = "2h"
    update = "2h"
    delete = "2h"
  }
  
}

 