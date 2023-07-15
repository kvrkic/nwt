/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import Header from './Header';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../interfaces/error-response.interface';
import { ErrorMessageEnum } from '../enums/errors.enum';

const Register = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const payload = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const { data } = await axios.post<string>(
        'http://localhost:3000/users/register',
        payload,
      );

      if (data === 'User created successfully') {
        setIsVisible(false);
        setErrorMessage('');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage = axiosError?.response?.data?.message;
        switch (errorMessage) {
          case ErrorMessageEnum.EMAIL_ALREADY_USED:
            setErrorMessage(ErrorMessageEnum.EMAIL_ALREADY_USED);
            break;
          case ErrorMessageEnum.EMAIL_ERROR:
            setErrorMessage(ErrorMessageEnum.EMAIL_ERROR);
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
          <h3>Create account:</h3>
          <form onSubmit={handleSubmit}>
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
        </div>
      )}
      {!isVisible && <div className="welcome">Verification email sent!</div>}
      {errorMessage && <div className="welcome">{errorMessage}</div>}
    </>
  );
};

export default Register;
