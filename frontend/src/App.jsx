import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './home_login';
import Header from './component/head';
import Loadmap from './component/Loadmap';
import Build09 from './number_09/build_09';
import Room090425 from './number_09/4f/room090425';
import Signup from './component/signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/loadmap" element={<Loadmap />} />
        <Route path="/component/signup" element={<Signup />} />
        <Route path="/building/:buildingId" element={<Build09 />} />
        <Route
          path="/building/:buildingId/room/:roomId"
          element={<Room090425 />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
