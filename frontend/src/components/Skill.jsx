import { useState } from 'react';
import axios from 'axios';
import './Skill.css';

function Skill({ skill, onEndorse }) {
  const [endorsing, setEndorsing] = useState(false);

  const handleEndorse = () => {
    setEndorsing(true);

    axios.post(`https://mohith123.pythonanywhere.com/api/endorse/${skill.id}/`)
      .then(response => {
        setEndorsing(false);
        onEndorse(skill.id, response.data.endorsements);
      })
      .catch(error => {
        setEndorsing(false);
        alert('Error endorsing: ' + error.message);
      });
  };

  return (
    <div className="skill-item">
      <span className="skill-name">{skill.name}</span>
      <span className="skill-endorsements">
        {skill.endorsements} {skill.endorsements === 1 ? 'endorsement' : 'endorsements'}
      </span>
      <button 
        className="endorse-btn" 
        onClick={handleEndorse}
        disabled={endorsing}
      >
        {endorsing ? '...' : '👍 Endorse'}
      </button>
    </div>
  );
}

export default Skill;