import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="welcome">
      <h3>404: Not Found</h3>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}
