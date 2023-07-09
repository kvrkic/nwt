import { Link } from 'react-router-dom';
import Header from './Header';

const Index = () => {
  return (
    <>
      <Header />
      <div className="welcome">
        <p>
          Welcome! Please <Link to={`users/register`}>register</Link> or{' '}
          <Link to={`users/login`}>login</Link> to continue
        </p>
      </div>
    </>
  );
};

export default Index;
