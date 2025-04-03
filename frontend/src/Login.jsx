import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 이 부분 api 변경하는게 좋을 것 같습니다.
      // 백엔드 구현 하고 추후에 합의
      const response = await axios.post('http://localhost:8080/auth/login', {
        studentId,
        password,
      });

      localStorage.setItem('token', response.data.access_token);
      window.location.href = '/Loadmap';
    } catch (err) {
      setError('로그인에 실패했습니다. 학번과 비밀번호를 확인해주세요.');
      console.error('로그인 오류:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
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
    </div>
  );
};

export default Login;
