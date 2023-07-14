import { useRouteError } from 'react-router-dom';
import Header from './Header';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Header />
      <div className="welcome">
        <h3>404: Not Found</h3>
        <p>Route doesn't exist</p>
      </div>
    </>
  );
}
