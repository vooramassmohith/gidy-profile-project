# Gidy Profile Page - Full Stack Challenge

## Live Demo
🔗 **Frontend:** https://gidy-profile-project.vercel.app  
🔗 **Backend API:** https://mohith123.pythonanywhere.com/api/profile/

---

## 📋 Tech Stack

### Frontend
- **React.js** (with Vite)
- **CSS3** (custom styling, no frameworks)
- **Axios** for API calls
- **Deployed on:** Vercel

### Backend
- **Python** / **Django**
- **Django REST Framework**
- **SQLite** database
- **Deployed on:** PythonAnywhere

### Additional Tools
- Git & GitHub
- django-cors-headers

---

## 🚀 Setup Instructions (Run Locally)

### Prerequisites
- Python 3.8+ installed
- Node.js 16+ installed
- Git installed

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/vooramassmohith/gidy-profile-project.git
cd gidy-profile-project/backend

# 2. Create and activate virtual environment
# Windows:
python -m venv venv
venv\Scripts\activate

# Mac/Linux:
python3 -m venv venv
source venv/bin/activate

# 3. Install dependencies
pip install django djangorestframework django-cors-headers

# 4. Run migrations
python manage.py migrate

# 5. Create superuser (for admin access)
python manage.py createsuperuser

# 6. Start backend server
python manage.py runserver