from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profile, Skill
from .serializers import ProfileSerializer, SkillSerializer

class ProfileDetail(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
    def get_object(self):
        # always use profile with ID 1 (single profile site)
        profile, created = Profile.objects.get_or_create(id=1)
        
        # convert comma-separated skills text into separate Skill objects
        if profile.skills and not profile.skill_set.exists():
            skill_names = [s.strip() for s in profile.skills.split(',') if s.strip()]
            for skill_name in skill_names:
                Skill.objects.create(
                    profile=profile,
                    name=skill_name,
                    endorsements=0
                )
        return profile
    
    def perform_update(self, serializer):
        profile = serializer.save()
        if profile.skills:
            # when skills text changes, update Skill objects
            # preserve endorsements for skills that still exist
            new_skill_names = [s.strip() for s in profile.skills.split(',') if s.strip()]
            existing_skills = {skill.name: skill for skill in profile.skill_set.all()}
            
            # remove skills that are no longer in the list
            for skill_name, skill in existing_skills.items():
                if skill_name not in new_skill_names:
                    skill.delete()
            
            # add new skills with 0 endorsements
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
        return Response({'error': 'Skill not found'}, status=404)