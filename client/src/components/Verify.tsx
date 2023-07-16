import { useEffect, useState } from 'react';
import Header from './Header';
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { ErrorMessageEnum } from '../enums/errors.enum';
import { ErrorResponse } from '../interfaces/error-response.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { useCookies } from 'react-cookie';

const Verify = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [, setCookie] = useCookies(['token', 'email']);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const resendEmail = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);

        const token = queryParams.get('token');

        const { data } = await axios.post<LoginResponse>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `http://localhost:3000/users/verify?token=${token}`,
        );

        setIsSuccessful(true);
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
            default:
              setErrorMessage(ErrorMessageEnum.UNKNOWN_ERROR);
          }
        } else {
          setErrorMessage(ErrorMessageEnum.UNKNOWN_ERROR);
        }
      }
    };
    void resendEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      {isSuccessful && (
        <div className="welcome">Email is successfully verified</div>
      )}
      {errorMessage && <div className="welcome">{errorMessage}</div>}
    </>
  );
};

export default Verify;
