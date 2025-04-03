import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './head.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" className="header__logo-link">
          <img
            src="/service_logo.png"
            alt="공강룸 로고"
            className="header__logo-img"
          />
        </Link>
      </div>
      <nav className="header__nav">
        <Link to="/loadmap" className="header__button">
          로드맵
        </Link>
        <button onClick={handleLogout} className="header__button">
          로그아웃
        </button>
      </nav>
    </header>
  );
};

export default Header;
