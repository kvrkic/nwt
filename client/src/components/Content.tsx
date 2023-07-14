import Header from './Header';

const Content = () => {
  //axios get /users, ukljucit token iz kolacica
  return (
    <>
      <Header />
      <div className="welcome">
        <p>
          Email sent to: <br />
          {/* <strong>{email}</strong> */}
          <br />
          with a joke: <br />
        </p>
        <p>{/* <strong>{data}</strong> */}</p>
      </div>
    </>
  );
};

export default Content;
