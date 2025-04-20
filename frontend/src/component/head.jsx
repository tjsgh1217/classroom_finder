import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './head.css';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentCampus, setCurrentCampus] = useState(() => {
    const savedCampus = localStorage.getItem('lastCampus');

    if (location.pathname.includes('/s_Loadmap')) {
      return '오정';
    } else if (location.pathname.includes('/loadmap')) {
      return '대덕';
    } else {
      return savedCampus || '대덕';
    }
  });
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleCampus = () => {
    const newCampus = currentCampus === '대덕' ? '오정' : '대덕';
    setCurrentCampus(newCampus);

    localStorage.setItem('lastCampus', newCampus);

    if (newCampus === '대덕') {
      navigate('/loadmap');
    } else {
      navigate('/s_Loadmap');
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/loadmap" className="header__logo">
          <img
            src="/service_logo.png"
            alt="공강룸 로고"
            className="header__logo-img"
            onClick={() => setCurrentCampus('대덕')}
          />
        </Link>
        <nav className="header__nav">
          <button onClick={toggleCampus} className="header__link">
            {currentCampus === '대덕'
              ? '대덕밸리 캠퍼스 맵'
              : '오정동 캠퍼스 맵'}
          </button>

          {/* <Link to="/loadmap" className="header__link">
            캠퍼스 맵
          </Link> */}
          {isLoggedIn ? (
            <>
              {/* <Link to="/loadmap" className="header__link">
                캠퍼스 맵
              </Link> */}
              <Link to="/component/mypage" className="header__link">
                회원정보
              </Link>
              <button onClick={handleLogout} className="header__button">
                로그아웃
              </button>
            </>
          ) : // <Link to="/component/signup" className="header__button">
          //   회원가입
          // </Link>
          null}
        </nav>
      </div>
    </header>
  );
};

export default Header;
