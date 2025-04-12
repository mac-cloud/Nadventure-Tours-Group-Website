output "frontend_static_site_url" {
  value = azurerm_storage_account.frontend.primary_web_endpoint
}

output "backend_app_url" {
  value = azurerm_linux_web_app.backend.default_hostname
}


