import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './home_login';
import Header from './component/head';
import Loadmap from './component/loadmap';
import Build09 from './number_09/build_09';
import Room090425 from './number_09/room090425';
import Signup from './component/signup';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
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
