from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField()
    profile_picture = models.URLField(blank=True)
    # store skills as comma-separated text for easy editing
    skills = models.TextField(help_text="Separate skills with commas")
    twitter = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    github = models.URLField(blank=True)
    
    def __str__(self):
        return self.name

class Skill(models.Model):
    # each skill belongs to one profile
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='skill_set')
    name = models.CharField(max_length=50)
    # start with 0 endorsements
    endorsements = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name