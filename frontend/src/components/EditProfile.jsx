import { useState } from 'react';
import axios from 'axios';
import './EditProfile.css';

function EditProfile({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    bio: profile.bio || '',
    skills: profile.skills || '',
    profile_picture: profile.profile_picture || '',
    twitter: profile.twitter || '',
    linkedin: profile.linkedin || '',
    github: profile.github || ''
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    
    // FIXED: Changed from .get to .put
    axios.put('https://mohith123.pythonanywhere.com/api/profile/', formData)
      .then(response => {
        setSaving(false);
        onSave(response.data);
      })
      .catch(error => {
        setSaving(false);
        alert('Error saving: ' + error.message);
      });
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell about yourself"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Skills (comma separated):</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., Python, React, Django"
            />
          </div>

          <div className="form-group">
            <label>Profile Picture URL:</label>
            <input
              type="text"
              name="profile_picture"
              value={formData.profile_picture}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label>Twitter URL:</label>
            <input
              type="url"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/username"
            />
          </div>

          <div className="form-group">
            <label>LinkedIn URL:</label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className="form-group">
            <label>GitHub URL:</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
            />
          </div>

          <div className="button-group">
            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;