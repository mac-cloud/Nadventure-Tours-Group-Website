resource "azurerm_linux_web_app" "backend" {
  name                = var.service_plan_name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.app_plan.id  

  site_config {
    
    app_command_line = "gunicorn tourApp.wsgi:application --bind 0.0.0.0:8000"
  }

 

  app_settings = {
    "WEBSITES_PORT"           = "8000"
    "DJANGO_SETTINGS_MODULE"  = "tourApp.settings"
    "PYTHONUNBUFFERED"        = "1"
  }
}
