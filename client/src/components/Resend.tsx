import { useEffect, useState } from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../interfaces/error-response.interface';
import { ErrorMessageEnum } from '../enums/errors.enum';

const Resend = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();

  useEffect(() => {
    const resendEmail = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);

        const email = queryParams.get('email');

        const { data } = await axios.post<string>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `http://localhost:3000/users/resend?email=${email}`,
        );

        if (data === ErrorMessageEnum.EMAIL_ALREADY_VERIFIED) {
          setErrorMessage(ErrorMessageEnum.EMAIL_ALREADY_VERIFIED);
        }

        if (!isSuccessful && data === 'Verification email has been resent') {
          setIsSuccessful(true);
          setErrorMessage('');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errorMessage = axiosError?.response?.data?.message;

          switch (errorMessage) {
            case ErrorMessageEnum.USER_DOESNT_EXIST:
              setErrorMessage(ErrorMessageEnum.USER_DOESNT_EXIST);
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
    void resendEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      {isSuccessful && (
        <div className="welcome">Verification email has been resent</div>
      )}
      {errorMessage && <div className="welcome">{errorMessage}</div>}
    </>
  );
};

export default Resend;
