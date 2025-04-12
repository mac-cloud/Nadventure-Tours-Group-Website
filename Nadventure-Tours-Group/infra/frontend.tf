# Define the Storage Account
resource "azurerm_storage_account" "frontend" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

# Enable static website hosting on the storage account
resource "azurerm_storage_account_static_website" "frontend_site" {
  storage_account_id = azurerm_storage_account.frontend.id
  index_document     = "index.html"
  error_404_document = "index.html"
}

resource "azurerm_storage_blob" "frontend_files" {
  for_each = fileset("../frontend/build", "*")

  name                   = each.value
  storage_account_name   = azurerm_storage_account.frontend.name
  storage_container_name = "$web"
  type                   = "Block"
  source                 = "../frontend/build/${each.value}"
  content_type           = lookup({
    "html" = "text/html",
    "css"  = "text/css",
    "js"   = "application/javascript",
    "json" = "application/json",
    "jpg"  = "image/jpeg",
    "png"  = "image/png",
    "svg"  = "image/svg+xml"
  }, split(".", each.value)[length(split(".", each.value)) - 1], "application/octet-stream")

  depends_on = [azurerm_storage_account_static_website.frontend_site]
}
