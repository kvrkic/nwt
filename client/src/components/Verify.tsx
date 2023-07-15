import { useEffect, useState } from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { ErrorMessageEnum } from '../enums/errors.enum';
import { ErrorResponse } from '../interfaces/error-response.interface';
import { LoginResponse } from '../interfaces/login-response.interface';

const Verify = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();

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
        //set cookie
        //redirect to content with data sent as props
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
  }, [location.search]);

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
