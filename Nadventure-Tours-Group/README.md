# 🏞️ Nadventure – Full-Stack Tour Company Web App with Cloud Deployment

**Nadventure** is a full-stack web application built for a tour and travel company, allowing users to explore destinations, book tours, and interact through a smooth, responsive interface. The backend is powered by **Django REST Framework**, the frontend is built with **React**, and the entire infrastructure is deployed on **Microsoft Azure** using **Terraform (Infrastructure as Code)**.

---

## 🚀 Features

### 🌍 User-Facing
- View and search tour packages
- Destination detail pages with images and itineraries
- Booking and inquiry forms
- Mobile-first responsive design

### 🛠️ Admin Panel
- Manage tour packages via Django Admin
- View and manage customer inquiries
- Update images, pricing, and schedules

### ☁️ DevOps & Deployment
- Infrastructure as Code using **Terraform**
- Deployed on **Microsoft Azure** (App Service, PostgreSQL/SQLite, Blob Storage)
- Environment variables managed securely
- CI/CD ready structure

---

## 🧰 Tech Stack

**Frontend:**
- React
- React Router
- Axios
- TailwindCSS / Bootstrap

**Backend:**
- Django (Python)
- Django REST Framework
- SQLite (development), PostgreSQL (production)

**DevOps & Infra:**
- Terraform
- Microsoft Azure (App Service, Storage Account, etc.)
- Azure CLI / ARM templates (optional)
- Git & GitHub

---

## 📁 Project Structure


---

## 📦 Setup & Installation

### 🔧 Backend (Django)

1. 
  ```bash
# Clone the repo
git clone https://github.com/yourusername/nadventure.git
cd nadventure/backend

2. # Create virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

3. # Install dependencies
pip install -r requirements.txt

4. # Run migrations & start server
python manage.py migrate
python manage.py runserver


5. # ☁️ Deploying with Terraform on Azure
You’ll need: Azure CLI, Terraform CLI, and an Azure account.

📂 Navigate to Infrastructure Directory

i ```bash
cd infra/terraform

1. # 🏗️ Initialize & Deploy
```bash
# Initialize Terraform
terraform init

# Preview changes
terraform plan

# Apply infrastructure to Azure
terraform apply

!(./screenshot/tour.jpeg)