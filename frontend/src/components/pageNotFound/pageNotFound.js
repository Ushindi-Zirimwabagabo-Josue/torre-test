import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

const PageNotFound = () => {
  return (
    <div className="text-center rounded-3 profile-container container my-5 ">
      <div className="container p-5">
        <FontAwesomeIcon
          className="align-middle select-cursor mb-3"
          icon={faGhost}
          size="9x"
        />
        <h3>The page you are looking for does not exist</h3>
      </div>
    </div>
  );
};

export default PageNotFound;
