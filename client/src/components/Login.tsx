import React from 'react';

interface LoginProps {
  error?: string;
}

const Login: React.FC<LoginProps> = ({ error }) => {
  return (
    <>
      <div className="container">
        <h3>Log in:</h3>
        <form action="/login" method="post">
          <p>
            <span>Email:</span>
            <input type="email" name="email" required />
          </p>
          <p>
            <span>Password:</span>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              maxLength={16}
            />
          </p>
          <input type="submit" />
        </form>
        {error && <h1>{error}</h1>}
      </div>
    </>
  );
};

export default Login;
