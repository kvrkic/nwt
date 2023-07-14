import { useState } from 'react';
import Header from './Header';

// const Verify = (queryParams) => {
const Resend = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  //mozda stavit da nije boolean nego string da prikazen error this user doesnt exist
  //error sending mail
  //email is already verified

  //check queryParams
  //axios post to server /Resend
  //if response = Verification email has been resent
  // setIsSuccessful(true)

  return (
    <>
      <Header />
      {isSuccessful && (
        <div className="welcome">Email is successfully resent</div>
      )}
      {!isSuccessful && <div className="welcome">Error</div>}
    </>
  );
};

export default Resend;
