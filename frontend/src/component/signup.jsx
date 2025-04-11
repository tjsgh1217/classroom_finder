import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    password: '',
    confirmPassword: '',
    name: '',
    department: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', {
        studentId: formData.studentId,
        password: formData.password,
        name: formData.name,
        department: formData.department,
      });

      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/');
    } catch (err) {
      console.error('회원가입 오류:', err);
      setError(
        err.response?.data?.message ||
          '회원가입에 실패했습니다. 다시 시도해주세요.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="signup-title">회원가입</h1>
        </div>

        {error && <div className="signup-error">{error}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-field">
            <label htmlFor="studentId">학번</label>
            <div className="input-container">
              <i className="icon user-icon">👤</i>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="학번을 입력하세요."
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="password">비밀번호</label>
            <div className="input-container">
              <i className="icon lock-icon">🔒</i>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요."
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <div className="input-container">
              <i className="icon lock-icon">🔒</i>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요."
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="name">이름</label>
            <div className="input-container">
              <i className="icon name-icon">📝</i>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요."
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="department">학과</label>
            <div className="input-container">
              <i className="icon department-icon">🏫</i>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="학과를 입력하세요."
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="signup-submit-button"
            disabled={isLoading}
          >
            {isLoading ? '처리 중...' : '회원가입'}
          </button>

          <div className="login-link-container">
            <Link to="/" className="login-link">
              로그인
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
