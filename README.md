# Gidy Profile Page - Full Stack Challenge

## Live Demo
🔗 **Frontend:** https://gidy-profile-project.vercel.app  
🔗 **Backend API:** https://mohith123.pythonanywhere.com/api/profile/

---

## 📋 Tech Stack

### Frontend
- **React.js** (with Vite)
- **CSS3** (custom styling)
- **Axios** for API calls
- **Deployed on:** Vercel

### Backend
- **Python** / **Django**
- **Django REST Framework**
- **SQLite** database
- **Deployed on:** PythonAnywhere

---

## 🚀 Setup Instructions (Run Locally)

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/vooramassmohith/gidy-profile-project.git
cd gidy-profile-project/backend

# Create and activate virtual environment
# Windows:
python -m venv venv
venv\Scripts\activate

# Mac/Linux:
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install django djangorestframework django-cors-headers

# Run migrations
python manage.py migrate

# Create superuser (for admin access)
python manage.py createsuperuser

# Start backend server
python manage.py runserver
