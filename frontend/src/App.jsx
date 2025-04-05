import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Header from './component/head';
import Loadmap from './component/Loadmap';
import Build09 from './number_09/build_09';
import Room090425 from './number_09/room090425';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Loadmap" element={<Loadmap />} />
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
