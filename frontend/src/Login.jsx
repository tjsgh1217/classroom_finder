import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '홍길동',
    studentId: '20230001',
    department: '컴퓨터공학과',
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8080/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserInfo({
            name: response.data.name,
            studentId: response.data.studentId,
            department: response.data.department,
          });
          setIsLoggedIn(true);
        } catch (err) {
          console.error('인증 오류:', err);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        studentId,
        password,
      });

      localStorage.setItem('token', response.data.access_token);

      const userResponse = await axios.get('http://localhost:8080/auth/me', {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      });

      setUserInfo({
        name: userResponse.data.name,
        studentId: userResponse.data.studentId,
        department: userResponse.data.department,
      });

      setIsLoggedIn(true);
    } catch (err) {
      setError('로그인에 실패했습니다. 학번과 비밀번호를 확인해주세요.');
      console.error('로그인 오류:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 테스트용 로그인/로그아웃 토글 버튼 핸들러
  const handleToggleLoginStatus = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    } else {
      localStorage.setItem('token', 'dummy_token_for_testing');
      setUserInfo({
        name: '홍길동',
        studentId: '20230001',
        department: '컴퓨터공학과',
      });
      setIsLoggedIn(true);
    }
  };

  const UserInfoCard = () => (
    <div className="login-card">
      <div className="login-header">
        <h1 className="login-title">내 정보</h1>
      </div>
      <div className="user-info-content">
        <div className="user-info-item">
          <div className="user-info-details">
            <h3>{userInfo.name}</h3>
            <p>학번: {userInfo.studentId}</p>
            <p>학과: {userInfo.department}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const LoginForm = () => (
    <div className="login-card">
      <div className="login-header">
        <h1 className="login-title">빈 강의실 서비스</h1>
      </div>

      {error && <div className="login-error">{error}</div>}

      <form onSubmit={handleLogin} className="login-form">
        <div className="form-field">
          <label htmlFor="studentId">Student ID</label>
          <div className="input-container">
            <i className="icon user-icon">👤</i>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter your student ID"
              required
            />
          </div>
        </div>

        <div className="form-field">
          <div className="password-label-row">
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-container">
            <i className="icon lock-icon">🔒</i>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">자동 완성</label>
        </div>

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );

  return (
    <div className="login-container">
      {/* 테스트용 토글 버튼 */}
      <div className="test-controls">
        <button
          onClick={handleToggleLoginStatus}
          className="test-toggle-button"
        >
          {isLoggedIn
            ? '테스트: 로그아웃 상태로 전환'
            : '테스트: 로그인 상태로 전환'}
        </button>
      </div>

      <div className="login-notice-wrapper">
        {isLoggedIn ? <UserInfoCard /> : <LoginForm />}

        <div className="notice-card">
          <div className="notice-header">
            <div className="notice-title-container">
              <h1 className="notice-title">공지사항</h1>
              <img
                src="/HNU_logo.png"
                alt="학교 로고"
                className="school-logo"
              />
            </div>
          </div>

          <div className="notice-content">
            <div className="notice-item">
              <h3>25.04.04 시간표 업데이트</h3>
              <p>11번 건물 강의실 시간표 업데이트 완료</p>
              <p>06번 건물 강의실 시간표 업데이트 완료</p>
              <p>56번 건물 강의실 시간표 업데이트 완료</p>
              <span className="notice-date">2025.04.04</span>
            </div>
            <div className="notice-item">
              <h3>사용 불가 강의실 안내</h3>
              <p>4.4부터 5.30까지 090320 강의실 사용 불가</p>
              <span className="notice-date">2025.04.03</span>
            </div>
            <div className="notice-item">
              <h3>강의시간표 변경 안내</h3>
              <p>060403 강의실 시간표가 변경되었습니다.</p>
              <span className="notice-date">2025.04.02</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
