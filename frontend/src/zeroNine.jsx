import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Loadmap from './Loadmap';
import BuildingDetail from './zeroNine';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loadmap" element={<Loadmap />} />
        <Route path="/building/:buildingId" element={<BuildingDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
