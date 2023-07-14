/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import Header from './Header';
import axios, { AxiosResponse } from 'axios';
import { LoginResponse } from '../interfaces/login-response.interface';

const Login = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const response = await axios.post<AxiosResponse<string | LoginResponse>>(
        'http://localhost:3000/users/login',
        data,
      );
      console.log(response);

      //handle reponses from server
      //set cookie to browser and redirect to content
      //popravit email na backendu da salje na /verify

      console.log(response.data);
      setIsVisible(false);
    } catch (error) {
      console.error(error);
      setErrorMessage('There was an error');
    }
  };
  return (
    <>
      <Header />
      {isVisible && (
        <div className="container">
          <h3>Log in:</h3>
          <form onSubmit={handleSubmit}>
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
        </div>
      )}
      {!isVisible && <div className="welcome">Login done!</div>}
      {errorMessage && <div className="welcome">{errorMessage}</div>}
    </>
  );
};

export default Login;
