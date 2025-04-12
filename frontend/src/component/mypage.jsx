import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mypage.css';

const API_URL = 'http://localhost:8080';

const Mypage = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    department: '',
    studentId: '',
  });
  const [passwordData, setPasswordData] = useState({
    oldpassword: '',
    newpassword: '',
    confirmPassword: '',
  });
  const [deleteData, setDeleteData] = useState({
    password: '',
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('로그인이 필요합니다.');
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('API 응답:', response.data);

        if (response.data && response.data.user) {
          setUserInfo(response.data.user);
        } else if (response.data) {
          setUserInfo(response.data);
        }
      } catch (error) {
        setMessage('사용자 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching user info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newpassword !== passwordData.confirmPassword) {
      setMessage('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${API_URL}/auth/password`,
        {
          oldpassword: passwordData.oldpassword,
          newpassword: passwordData.newpassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('비밀번호가 성공적으로 변경되었습니다.');
      setShowPasswordModal(false);
      setPasswordData({
        oldpassword: '',
        newpassword: '',
        confirmPassword: '',
      });

      localStorage.removeItem('token');

      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      setMessage('비밀번호 변경에 실패했습니다.');
      console.error('Error changing password:', error);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/auth/delete`, {
        data: { password: deleteData.password },
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem('token');
      setMessage('회원 탈퇴가 완료되었습니다.');
      window.location.href = '/';
    } catch (error) {
      setMessage('회원 탈퇴에 실패했습니다.');
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1>회원정보</h1>

      {message && <div className="message">{message}</div>}

      {isLoading ? (
        <div>로딩 중...</div>
      ) : (
        <div className="profile-card">
          <div className="profile-info">
            <div className="info-item">
              <label>이름</label>
              <p>{userInfo.name || '정보 없음'}</p>
            </div>
            <div className="info-item">
              <label>학과</label>
              <p>{userInfo.department || '정보 없음'}</p>
            </div>
            <div className="info-item">
              <label>학번</label>
              <p>{userInfo.studentId || '정보 없음'}</p>
            </div>
          </div>

          <div className="profile-actions">
            <button
              className="btn change-password"
              onClick={() => setShowPasswordModal(true)}
            >
              비밀번호 변경
            </button>
            <button
              className="btn delete-account"
              onClick={() => setShowDeleteModal(true)}
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>비밀번호 변경</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>현재 비밀번호</label>
                <input
                  type="password"
                  value={passwordData.oldpassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldpassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>새 비밀번호</label>
                <input
                  type="password"
                  value={passwordData.newpassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newpassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>새 비밀번호 확인</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn save">
                  저장
                </button>
                <button
                  type="button"
                  className="btn cancel"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({
                      oldpassword: '',
                      newpassword: '',
                      confirmPassword: '',
                    });
                  }}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>회원 탈퇴</h2>
            <p className="warning">
              정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            <form onSubmit={handleDeleteAccount}>
              <div className="form-group">
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  value={deleteData.password}
                  onChange={(e) =>
                    setDeleteData({ ...deleteData, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn delete">
                  탈퇴하기
                </button>
                <button
                  type="button"
                  className="btn cancel"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteData({ password: '' });
                  }}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mypage;
