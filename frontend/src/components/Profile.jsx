import { useState, useEffect } from 'react';
import axios from 'axios';
import EditProfile from './EditProfile';
import Skill from './Skill';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = () => {
    axios.get('https://mohith123.pythonanywhere.com/api/profile/')
      .then(response => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
    fetchProfile();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEndorse = (skillId, newEndorsements) => {
    setProfile(prev => {
      const updatedSkills = prev.skills_list.map(skill => 
        skill.id === skillId ? { ...skill, endorsements: newEndorsements } : skill
      );
      return { ...prev, skills_list: updatedSkills };
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!profile) return <div className="no-profile">No profile found</div>;

  if (isEditing) {
    return <EditProfile profile={profile} onSave={handleSave} onCancel={handleCancel} />;
  }

  return (
    <div className="container">
      <div className="profile-card">
        {profile.profile_picture && (
          <img 
            src={profile.profile_picture} 
            alt="Profile" 
            className="profile-image"
          />
        )}
        <h1 className="profile-name">{profile.name || 'No name added'}</h1>
        <p className="profile-bio"><strong>Bio:</strong> {profile.bio || 'No bio added'}</p>
        
        {/* Social Links Section */}
        <div className="social-links">
          <h3>Social Links</h3>
          <div className="social-icons">
            {profile.twitter && (
              <a 
                href={profile.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link twitter"
              >
                Twitter
              </a>
            )}
            {profile.linkedin && (
              <a 
                href={profile.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link linkedin"
              >
                LinkedIn
              </a>
            )}
            {profile.github && (
              <a 
                href={profile.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link github"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
        
        <div className="skills-section">
          <h3>Skills</h3>
          {profile.skills_list && profile.skills_list.length > 0 ? (
            profile.skills_list.map(skill => (
              <Skill 
                key={skill.id} 
                skill={skill} 
                onEndorse={handleEndorse}
              />
            ))
          ) : (
            <p>No skills added yet. Edit profile to add skills.</p>
          )}
        </div>
        
        <button className="edit-button" onClick={handleEdit}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;