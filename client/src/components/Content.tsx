import { useCookies } from 'react-cookie';
import Header from './Header';
import { useEffect, useState } from 'react';
import { ErrorMessageEnum } from '../enums/errors.enum';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../interfaces/error-response.interface';

const Content = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [joke, setJoke] = useState('');
  const [cookies] = useCookies(['token', 'email']);

  useEffect(() => {
    const readCookie = async () => {
      try {
        const token = cookies.token as string;
        setEmail(cookies.email as string);

        const { data } = await axios.get<string>(
          'http://localhost:3000/users',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setJoke(data);
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errorMessage = axiosError?.response?.data?.message;
          console.log(errorMessage);
          switch (errorMessage) {
            case ErrorMessageEnum.UNAUTHORIZED:
              setErrorMessage(ErrorMessageEnum.UNAUTHORIZED);
              break;
            case ErrorMessageEnum.USER_DOESNT_EXIST:
              setErrorMessage(ErrorMessageEnum.USER_DOESNT_EXIST);
              break;
            case ErrorMessageEnum.INCORRECT_TOKEN:
              setErrorMessage(ErrorMessageEnum.INCORRECT_TOKEN);
              break;
            default:
              setErrorMessage(ErrorMessageEnum.UNKNOWN_ERROR);
          }
        } else {
          setErrorMessage(ErrorMessageEnum.UNKNOWN_ERROR);
        }
      }
    };
    void readCookie();
  }, [cookies.email, cookies.token]);

  return (
    <>
      <Header />
      {email && joke && (
        <div className="welcome">
          <p>
            Email sent to: <br />
            <strong>{email}</strong>
            <br />
            with a joke: <br />
          </p>
          <p>
            <strong>{joke}</strong>
          </p>
        </div>
      )}
      {errorMessage && <div className="welcome">{errorMessage}</div>}
    </>
  );
};

export default Content;
