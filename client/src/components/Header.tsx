import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div>
        <h1>
          <Link to={`/`} className="header">
            Chuck Norris Joke app
          </Link>
        </h1>
      </div>
    </>
  );
};

export default Header;
