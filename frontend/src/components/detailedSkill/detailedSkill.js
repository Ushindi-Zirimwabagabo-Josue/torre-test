import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBalanceScale,
  faHandshake,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import SingleSkill from '../skill/skill';
import './detailedSkill.css';

const DetailedSkill = (props) => {
  const { name, proficiency, recommendations, weight, exit } = props;
  const [relatedPeople, setRelatedPeople] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/usersWithSkill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill: name, proficiency }),
      });
      const fetchedUsers = await response.json();
      setRelatedPeople(fetchedUsers.results);
    })();
  }, [name, proficiency]);

  return (
    <div className="container detailed-skill-container p-3 rounded-3">
      <div className="text-end">
        <button className="styleless-button" onClick={() => exit()}>
          <FontAwesomeIcon
            className="align-middle select-cursor m-1"
            icon={faTimes}
            size="lg"
          />
        </button>
      </div>
      <div className="row mb-1">
        <div className="sk-container">
          <h3>{name}</h3>
        </div>
        <div className="p-2 border-bottom text-center">
          <div className="secondary-font-color">Proficiency:</div>
          <h4 className="capitalize">{proficiency}</h4>
        </div>
      </div>
      <div className="row p-3 text-center border-bottom">
        <div className="col">
          <div>{recommendations}</div>
          <div>recommendations</div>
        </div>
        <div className="col">
          <div>{Math.round(weight)}</div>
          <div>Recommendation weight</div>
        </div>
      </div>
      <div className="row p-3">
        <h4 className="text-center">People with the same skill:</h4>
        <div>
          {relatedPeople === undefined ? (
            <div className="p-4">
              <div class="spinner-grow loading-icon" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            relatedPeople.map((person) => (
              <SingleSkill
                key={person.subjectId}
                content={person.name}
                onClick={() => {
                  exit();
                  navigate(`/user/${person.username}`);
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedSkill;
