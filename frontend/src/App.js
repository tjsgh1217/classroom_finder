import { useEffect, useState } from 'react';
import API from './api.ts';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get('/hello')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <div>{data ? data.message : 'Loading...'}</div>;
}

export default App;
