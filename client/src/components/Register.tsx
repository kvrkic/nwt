/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import Header from './Header';
import axios, { AxiosResponse } from 'axios';

const Register = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const response = await axios.post<AxiosResponse<string>>(
        'http://localhost:3000/users/register',
        data,
      );
      console.log(response);
      // @todo
      // krenia san pisat ovo
      // axios post na /users/register, napisat poruku da triba verificirat mail,
      // napravit novu komponentu i path /verify na koji ce ga vodit link iz maila
      // poigrat se sa query parametrima, primit token iz maila i napravit axios post sa tokenon
      // prikazat korisniku poruku da je verificirat uspjesno ili nije, smislit sta onda
      // resend path napravit slicno ko i verify, koji radi axios post na backend sa mailon u bodyu
      // i onda prikaze odgovor korisniku

      // if (response.data === 'User created') {
      //   console.log('tocno tako je i bilo');
      // }
      // if(response.data == Object)

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
