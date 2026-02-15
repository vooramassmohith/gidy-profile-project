from django.urls import path
from . import views

urlpatterns = [
    path('api/profile/', views.ProfileDetail.as_view()),
    path('api/endorse/<int:skill_id>/', views.endorse_skill, name='endorse_skill'),
]