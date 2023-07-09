import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios
      .get('https://api.chucknorris.io/jokes/random')
      .then(response => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        setData(response.data.value); // Access the 'value' property containing the joke
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <div>{data}</div>
    </>
  );
}

export default App;
