from rest_framework import serializers
from .models import Profile, Skill

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'endorsements']

class ProfileSerializer(serializers.ModelSerializer):
    skills_list = SkillSerializer(source='skill_set', many=True, read_only=True)
    
    class Meta:
        model = Profile
        fields = ['id', 'name', 'bio', 'profile_picture', 'skills', 'skills_list', 
                  'twitter', 'linkedin', 'github']  # Added social links here