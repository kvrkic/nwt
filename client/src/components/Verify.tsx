import { useState } from 'react';
import Header from './Header';

// const Verify = (queryParams) => {
const Verify = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  //mozda stavit da nije boolean nego string da prikazen error this user doesnt exist

  //check queryParams
  //axios post to server /verify
  //if response = return loginResponse(user(firstname, lastname, email), access token)
  // setIsSuccessful(true)

  return (
    <>
      <Header />
      {isSuccessful && (
        <div className="welcome">Email is successfully verified</div>
      )}
      {!isSuccessful && <div className="welcome">Error</div>}
    </>
  );
};

export default Verify;
