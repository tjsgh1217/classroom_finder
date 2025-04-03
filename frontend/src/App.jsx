import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Header from './component/head';
import Loadmap from './Loadmap';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loadmap" element={<Loadmap />} />{' '}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
