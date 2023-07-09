import React from 'react';

interface ContentProps {
  email: string;
  data: string;
}

const Content: React.FC<ContentProps> = ({ email, data }) => {
  return (
    <div className="welcome">
      <p>
        Email sent to: <br />
        <strong>{email}</strong>
        <br />
        with a joke: <br />
      </p>
      <p>
        <strong>{data}</strong>
      </p>
    </div>
  );
};

export default Content;
