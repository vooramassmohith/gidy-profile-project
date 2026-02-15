from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profile, Skill
from .serializers import ProfileSerializer, SkillSerializer

class ProfileDetail(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
    def get_object(self):
        profile, created = Profile.objects.get_or_create(id=1)
        # Create skills from text if they don't exist
        if profile.skills and not profile.skill_set.exists():
            self._create_skills_from_text(profile)
        return profile
    
    def perform_update(self, serializer):
        # Save the profile first
        profile = serializer.save()
        
        # Now handle skills based on the new skills text
        if profile.skills:
            self._update_skills_from_text(profile)
    
    def _create_skills_from_text(self, profile):
        """Create skill objects from comma-separated text"""
        skill_names = [s.strip() for s in profile.skills.split(',') if s.strip()]
        for skill_name in skill_names:
            Skill.objects.create(
                profile=profile,
                name=skill_name,
                endorsements=0
            )
    
    def _update_skills_from_text(self, profile):
        """Update skills based on new text, preserving endorsements"""
        # Get new skill names from text
        new_skill_names = [s.strip() for s in profile.skills.split(',') if s.strip()]
        
        # Get existing skills
        existing_skills = {skill.name: skill for skill in profile.skill_set.all()}
        
        # Track which skills to keep/delete/add
        skills_to_delete = []
        
        # Check each existing skill
        for skill_name, skill in existing_skills.items():
            if skill_name not in new_skill_names:
                # This skill was removed, mark for deletion
                skills_to_delete.append(skill)
        
        # Delete removed skills
        for skill in skills_to_delete:
            skill.delete()
        
        # Add new skills
        for skill_name in new_skill_names:
            if skill_name not in existing_skills:
                Skill.objects.create(
                    profile=profile,
                    name=skill_name,
                    endorsements=0
                )

@api_view(['POST'])
def endorse_skill(request, skill_id):
    try:
        skill = Skill.objects.get(id=skill_id)
        skill.endorsements += 1
        skill.save()
        return Response({'endorsements': skill.endorsements})
    except Skill.DoesNotExist:
        return Response({'error': 'Skill not found'}, status=status.HTTP_404_NOT_FOUND)