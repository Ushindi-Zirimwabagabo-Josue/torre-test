import './skill.css';

const SingleSkill = (props) => {
  const { content, onClick } = props;
  return (
    <div className="p-2 m-1 skill" onClick={onClick}>
      {content}
    </div>
  );
};

export default SingleSkill;
