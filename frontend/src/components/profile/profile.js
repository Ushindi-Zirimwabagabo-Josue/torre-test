import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailedSkill from '../detailedSkill/detailedSkill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRunning,
  faWalking,
  faBaby,
  faBiking,
  faChild,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import SingleSkill from '../skill/skill';
import './profile.css';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState();
  const [detailedSkill, setDetailedSkill] = useState();
  const skillElements = {
    master: { icon: faBiking, priority: 5 },
    expert: { icon: faRunning, priority: 4 },
    proficient: { icon: faWalking, priority: 3 },
    novice: { icon: faChild, priority: 2 },
    'no-experience-interested': { icon: faBaby, priority: 1 },
  };

  const generateSkills = () => {
    const skills = {};
    for (const {
      id,
      name,
      proficiency,
      recommendations,
      weight,
    } of user.strengths) {
      if (skills[proficiency] === undefined)
        skills[proficiency] = [
          { id, name, recommendations, weight, proficiency },
        ];
      else
        skills[proficiency].push({
          id,
          name,
          recommendations,
          weight,
          proficiency,
        });
    }
    const skillLevels = [];
    for (const skill in skills)
      skillLevels.push({
        level: skill,
        skills: skills[skill],
        priority: skillElements[skill].priority,
      });
    return skillLevels.sort((a, b) => b.priority - a.priority);
  };

  const exitModal = (event) => {
    if (event.target === event.currentTarget) setDetailedSkill();
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/user/${username}`);
      const fetchedUser = await response.json();
      setUser(fetchedUser);
    })();
  }, [username]);

  return (
    <>
      <div className="text-center rounded-3 profile-container container my-5 ">
        <div className="container p-2 p-lg-5">
          {user === undefined ? (
            <div className="p-4">
              <div class="spinner-grow loading-icon" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <img
                src={user ? user.person.picture : '/empty.png'}
                alt="user profile"
                className="profile-image mb-3"
              />

              <h1 className="mb-3 torre-font">
                {user.person.name}{' '}
                {user.person.verified && (
                  <FontAwesomeIcon
                    className="verified-icon"
                    icon={faCheckCircle}
                    size="xs"
                  />
                )}
              </h1>
              <h6 className="mb-3 torre-font">
                {user.person.professionalHeadline}{' '}
              </h6>
              <h6 className="mb-2 torre-font">{user.person.location.name} </h6>
              <p className="mb-2 summaryOfBio torre-font">
                {user.person.summaryOfBio}{' '}
              </p>
              <h2 className="text-start mb-2 px-3">Skills and interests: </h2>
              {generateSkills().map((skillLevel, index) => (
                <div
                  key={skillLevel.level}
                  className={`overflow-auto border-bottom p-3 text-start ${
                    index === 0 ? 'border-top' : ''
                  }`}
                >
                  <h4 className="align mb-2 d-table">
                    <div className="float-start d-table-cell align-middle">
                      <FontAwesomeIcon
                        className="m-1"
                        icon={skillElements[skillLevel.level].icon}
                      />
                    </div>
                    <div className="d-table-cell align-middle">
                      {skillLevel.level}:
                    </div>
                  </h4>
                  {skillLevel.skills.map((skill) => (
                    <SingleSkill
                      key={skill.id}
                      content={skill.name}
                      onClick={() => setDetailedSkill(skill)}
                    />
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {detailedSkill !== undefined && (
        <div className="detailed-skill-selected-background" onClick={exitModal}>
          <div className="detailed-skill-selected row m-0" onClick={exitModal}>
            <div className="col-1 col-lg-3" onClick={exitModal} />
            <div className="col">
              <DetailedSkill
                exit={() => setDetailedSkill()}
                name={detailedSkill.name}
                proficiency={detailedSkill.proficiency}
                recommendations={detailedSkill.recommendations}
                weight={detailedSkill.weight}
              />
            </div>

            <div className="col-1 col-lg-3" onClick={exitModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
