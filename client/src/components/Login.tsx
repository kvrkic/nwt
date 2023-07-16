/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import Header from './Header';
import axios, { AxiosError } from 'axios';
import { LoginResponse } from '../interfaces/login-response.interface';
import { ErrorResponse } from '../interfaces/error-response.interface';
import { ErrorMessageEnum } from '../enums/errors.enum';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [, setCookie] = useCookies(['token', 'email']);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const payload = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const { data } = await axios.post<LoginResponse>(
        'http://localhost:3000/users/login',
        payload,
      );
      setIsVisible(false);
      setErrorMessage('');

      setCookie('token', data.access_token);
      setCookie('email', data.user.email);

      navigate('/content');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage = axiosError?.response?.data?.message;
        switch (errorMessage) {
          case ErrorMessageEnum.USER_DOESNT_EXIST:
            setErrorMessage(ErrorMessageEnum.USER_DOESNT_EXIST);
            break;
          case ErrorMessageEnum.INCORRECT_PASSWORD:
            setErrorMessage(ErrorMessageEnum.INCORRECT_PASSWORD);
            break;
          case ErrorMessageEnum.VERIFY_EMAIL:
            setErrorMessage(ErrorMessageEnum.VERIFY_EMAIL);
            break;
          default:
            setErrorMessage(ErrorMessageEnum.UNKNOWN_ERROR);
        }
      } else {
        setErrorMessage(ErrorMessageEnum.UNKNOWN_ERROR);
      }
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
