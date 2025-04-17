import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useNavigate,
} from 'react-router-dom';
import React, { useState, useEffect, createContext, useContext } from 'react';
import Login from './home_login';
import Header from './component/head';
import Loadmap from './component/Loadmap';
import Mypage from './component/mypage';
import Signup from './component/signup';

import Build09 from './number_09/build_09';
import Build56 from './number_56/build_56';
import Build06 from './number_06/build_06';
import Build04 from './number_04/build_04';
import Build05 from './number_05/build_05';
import Build11 from './number_11/build_11';
import Build02 from './number_02/build_02';
import Build03 from './number_03/build_03';
import Build26 from './number_26/build_26';
import Build07 from './number_07/build_07';
import Build50 from './number_50/build_50';
import Build42 from './number_42/build_42';
import Build45 from './number_45/build_45';
import Build47 from './number_47/build_47';

import Room090425 from './number_09/4F/room090425';
import Room090106 from './number_09/1F/room090106';
import Room090119 from './number_09/1F/room090119';
import Room090219 from './number_09/2F/room090219';
import Room090320 from './number_09/3F/room090320';
import Room090327 from './number_09/3F/room090327';
import Room090408 from './number_09/4F/room090408';
import Room090409 from './number_09/4F/room090409';
import Room090410 from './number_09/4F/room090410';
import Room090411 from './number_09/4F/room090411';
import Room090420 from './number_09/4F/room090420';
import Room090516 from './number_09/5F/room090516';
import Room090517 from './number_09/5F/room090517';
import Room090518 from './number_09/5F/room090518';
import Room090519 from './number_09/5F/room090519';
import Room090520 from './number_09/5F/room090520';
import Room090522 from './number_09/5F/room090522';
import Room090524 from './number_09/5F/room090524';

import Room560108 from './number_56/1F/room560108';
import Room560401 from './number_56/4F/room560401';
import Room560402 from './number_56/4F/room560402';
import Room560403 from './number_56/4F/room560403';
import Room560501 from './number_56/5F/room560501';
import Room560502 from './number_56/5F/room560502';
import Room560505 from './number_56/5F/room560505';
import Room560524 from './number_56/5F/room560524';
import Room560610 from './number_56/6F/room560610';
import Room560611 from './number_56/6F/room560611';
import Room560613 from './number_56/6F/room560613';
import Room560614 from './number_56/6F/room560614';
import Room560622 from './number_56/6F/room560622';
import Room560701 from './number_56/7F/room560701';
import Room560704 from './number_56/7F/room560704';
import Room560705 from './number_56/7F/room560705';
import Room560706 from './number_56/7F/room560706';
import Room560707 from './number_56/7F/room560707';
import Room560708 from './number_56/7F/room560708';
import Room560710 from './number_56/7F/room560710';
import Room560711 from './number_56/7F/room560711';
import Room560712 from './number_56/7F/room560712';
import Room560909 from './number_56/9F/room560909';

import Room060212 from './number_06/2F/room060212';
import Room060213 from './number_06/2F/room060213';
import Room060217 from './number_06/2F/room060217';
import Room060228 from './number_06/2F/room060228';
import Room060334 from './number_06/3F/room060334';
import Room060335 from './number_06/3F/room060335';
import Room060510 from './number_06/5F/room060510';
import Room060520 from './number_06/5F/room060520';
import Room060526 from './number_06/5F/room060526';
import Room060527 from './number_06/5F/room060527';
import Room060528 from './number_06/5F/room060528';
import Room060529 from './number_06/5F/room060529';

import Room260214 from './number_26/2F/room260214';
import Room260215 from './number_26/2F/room260215';
import Room260216 from './number_26/2F/room260216';
import Room260222 from './number_26/2F/room260222';
import Room260223 from './number_26/2F/room260223';
import Room260228 from './number_26/2F/room260228';
import Room260229 from './number_26/2F/room260229';

import Room030106 from './number_03/1F/room030106';
import Room030111 from './number_03/1F/room030111';
import Room030117 from './number_03/1F/room030117';
import Room030118 from './number_03/1F/room030118';
import Room030119 from './number_03/1F/room030119';
import Room030120 from './number_03/1F/room030120';
import Room030310 from './number_03/3F/room030310';
import Room030323 from './number_03/3F/room030323';
import Room030401 from './number_03/4F/room030401';
import Room030411 from './number_03/4F/room030411';
import Room030412 from './number_03/4F/room030412';
import Room030413 from './number_03/4F/room030413';
import Room030414 from './number_03/4F/room030414';
import Room030415 from './number_03/4F/room030415';

import Room050349 from './number_05/3F/room050349';
import Room050351 from './number_05/3F/room050351';
import Room050431 from './number_05/4F/room050431';
import Room050432 from './number_05/4F/room050432';
import Room050435 from './number_05/4F/room050435';
import Room050440 from './number_05/4F/room050440';
import Room050503 from './number_05/5F/room050503';
import Room050504 from './number_05/5F/room050504';
import Room050505 from './number_05/5F/room050505';
import Room050506 from './number_05/5F/room050506';
import Room050508 from './number_05/5F/room050508';
import Room050510 from './number_05/5F/room050510';
import Room050511 from './number_05/5F/room050511';
import Room050512 from './number_05/5F/room050512';
import Room050521 from './number_05/5F/room050521';
import Room050603 from './number_05/6F/room050603';
import Room050604 from './number_05/6F/room050604';
import Room050606 from './number_05/6F/room050606';
import Room050607 from './number_05/6F/room050607';
import Room050608 from './number_05/6F/room050608';
import Room050609 from './number_05/6F/room050609';
import Room050610 from './number_05/6F/room050610';
import Room050615 from './number_05/6F/room050615';
import Room050616 from './number_05/6F/room050616';
import Room050701 from './number_05/7F/room050701';
import Room050702 from './number_05/7F/room050702';
import Room050703 from './number_05/7F/room050703';
import Room050704 from './number_05/7F/room050704';
import Room050705 from './number_05/7F/room050705';
import Room050708 from './number_05/7F/room050708';
import Room050709 from './number_05/7F/room050709';

function RoomRouter() {
  const { roomId } = useParams();

  const roomComponents = {
    '090425': <Room090425 />,
    '090106': <Room090106 />,
    '090119': <Room090119 />,
    '090219': <Room090219 />,
    '090320': <Room090320 />,
    '090327': <Room090327 />,
    '090408': <Room090408 />,
    '090409': <Room090409 />,
    '090410': <Room090410 />,
    '090411': <Room090411 />,
    '090420': <Room090420 />,
    '090516': <Room090516 />,
    '090517': <Room090517 />,
    '090518': <Room090518 />,
    '090519': <Room090519 />,
    '090520': <Room090520 />,
    '090522': <Room090522 />,
    '090524': <Room090524 />,
    560108: <Room560108 />,
    560401: <Room560401 />,
    560402: <Room560402 />,
    560403: <Room560403 />,
    560501: <Room560501 />,
    560502: <Room560502 />,
    560505: <Room560505 />,
    560524: <Room560524 />,
    560610: <Room560610 />,
    560611: <Room560611 />,
    560613: <Room560613 />,
    560614: <Room560614 />,
    560622: <Room560622 />,
    560701: <Room560701 />,
    560704: <Room560704 />,
    560705: <Room560705 />,
    560706: <Room560706 />,
    560707: <Room560707 />,
    560708: <Room560708 />,
    560710: <Room560710 />,
    560711: <Room560711 />,
    560712: <Room560712 />,
    560909: <Room560909 />,
    '060212': <Room060212 />,
    '060213': <Room060213 />,
    '060217': <Room060217 />,
    '060228': <Room060228 />,
    '060334': <Room060334 />,
    '060335': <Room060335 />,
    '060510': <Room060510 />,
    '060520': <Room060520 />,
    '060526': <Room060526 />,
    '060527': <Room060527 />,
    '060528': <Room060528 />,
    '060529': <Room060529 />,
    260214: <Room260214 />,
    260215: <Room260215 />,
    260216: <Room260216 />,
    260222: <Room260222 />,
    260223: <Room260223 />,
    260228: <Room260228 />,
    260229: <Room260229 />,
    '030106': <Room030106 />,
    '030111': <Room030111 />,
    '030117': <Room030117 />,
    '030118': <Room030118 />,
    '030119': <Room030119 />,
    '030120': <Room030120 />,
    '030310': <Room030310 />,
    '030323': <Room030323 />,
    '030401': <Room030401 />,
    '030411': <Room030411 />,
    '030412': <Room030412 />,
    '030413': <Room030413 />,
    '030414': <Room030414 />,
    '030415': <Room030415 />,
    '050349': <Room050349 />,
    '050351': <Room050351 />,
    '050431': <Room050431 />,
    '050432': <Room050432 />,
    '050435': <Room050435 />,
    '050440': <Room050440 />,
    '050503': <Room050503 />,
    '050504': <Room050504 />,
    '050505': <Room050505 />,
    '050506': <Room050506 />,
    '050508': <Room050508 />,
    '050510': <Room050510 />,
    '050511': <Room050511 />,
    '050512': <Room050512 />,
    '050521': <Room050521 />,
    '050603': <Room050603 />,
    '050604': <Room050604 />,
    '050606': <Room050606 />,
    '050607': <Room050607 />,
    '050608': <Room050608 />,
    '050609': <Room050609 />,
    '050610': <Room050610 />,
    '050615': <Room050615 />,
    '050616': <Room050616 />,
    '050701': <Room050701 />,
    '050702': <Room050702 />,
    '050703': <Room050703 />,
    '050704': <Room050704 />,
    '050705': <Room050705 />,
    '050708': <Room050708 />,
    '050709': <Room050709 />,
  };

  return roomComponents[roomId] || <div>해당 방을 찾을 수 없습니다.</div>;
}

function BuildingRouter() {
  const { buildingId } = useParams();

  if (buildingId === '9') return <Build09 />;
  if (buildingId === '56') return <Build56 />;
  if (buildingId === '6') return <Build06 />;
  if (buildingId === '4') return <Build04 />;
  if (buildingId === '5') return <Build05 />;
  if (buildingId === '11') return <Build11 />;
  if (buildingId === '2') return <Build02 />;
  if (buildingId === '3') return <Build03 />;
  if (buildingId === '26') return <Build26 />;
  if (buildingId === '7') return <Build07 />;
  if (buildingId === '50') return <Build50 />;
  if (buildingId === '42') return <Build42 />;
  if (buildingId === '45') return <Build45 />;
  if (buildingId === '47') return <Build47 />;
}
const AuthContext = createContext();
function useAuth() {
  return useContext(AuthContext);
}
function isTokenExpired(token) {
  if (!token) return true;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));

    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
}

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem('token');

      if (!token || isTokenExpired(token)) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    checkTokenValidity();

    const intervalId = setInterval(checkTokenValidity, 60000);
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ element }) {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/');
      alert('로그인이 필요한 페이지입니다.');
    }
  }, [isLoggedIn, isLoading, navigate]);

  return isLoading ? <div>로딩 중...</div> : isLoggedIn ? element : null;
}

function AppRoutes() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <>
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
        <Route path="/building/:buildingId" element={<BuildingRouter />} />
        <Route
          path="/building/:buildingId/room/:roomId"
          element={<RoomRouter />}
        />

        <Route
          path="/component/mypage"
          element={<ProtectedRoute element={<Mypage />} />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
