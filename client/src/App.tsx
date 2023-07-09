import './App.css';
import Content from './components/Content';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <>
      <Index />
      <Register />
      {/* 
      handle error:
      if(error), call component Login with prop error, if no error, call without prop error; 
      */}
      <Login />
      <Content email="karlo" data="nista" />
    </>
  );
};

export default App;
