from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField()
    profile_picture = models.URLField(blank=True)
    skills = models.TextField(help_text="Separate skills with commas")
    # ADD SOCIAL LINKS HERE (inside Profile)
    twitter = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    
    def __str__(self):
        return self.name

class Skill(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='skill_set')
    name = models.CharField(max_length=50)
    endorsements = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name
    
    # REMOVE social links from here - they don't belong here!   