import React from 'react';

interface LoginProps {
  error?: string;
}

const Login: React.FC<LoginProps> = ({ error }) => {
  return (
    <>
      <div className="container">
        <h3>Create account:</h3>
        <form action="/register" method="post">
          <p>
            <span>First Name:</span>
            <input type="text" name="firstName" required />
          </p>
          <p>
            <span>Last Name:</span>
            <input type="text" name="lastName" required />
          </p>
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
