import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../component/build.css';

const Build11 = () => {
  const { buildingId } = useParams();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const navigate = useNavigate();

  const floorRoomNumbers = {
    1: [9, 18],
    2: [4, 5, 6, 10, 13, 17, 19, 20, 21, 23],
    3: [3, 4, 5, 6, 7, 8, 10, 11, 12],
    4: [2, 8, 9, 10],
    5: [],
  };

  const availableRooms = [
    '110109',
    '110118',
    '110204',
    '110205',
    '110206',
    '110210',
    '110213',
    '110217',
    '110219',
    '110220',
    '110221',
    '110223',
    '110303',
    '110304',
    '110305',
    '110306',
    '110307',
    '110308',
    '110310',
    '110311',
    '110312',
    '110402',
    '110408',
    '110409',
    '110410',
  ];

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
  };

  const handleRoomClick = (roomId) => {
    const roomCode = `11${String(selectedFloor).padStart(2, '0')}${String(
      roomId
    ).padStart(2, '0')}`;

    if (availableRooms.includes(roomCode)) {
      navigate(`/building/${buildingId}/room/${roomCode}`);
    } else {
      alert(`${selectedFloor}층 강의실 ${roomId} 정보는 준비 중입니다.`);
    }
  };

  return (
    <div className="building-container">
      <div className="top-gradient"></div>

      <header className="building-header">
        <div className="header-content">
          <h1>{buildingId}번 건물 - 인사례교양동</h1>
        </div>
      </header>

      <div className="content-wrapper">
        <div className="floor-selector">
          <div className="floor-buttons">
            {[1, 2, 3, 4, 5].map((floor) => (
              <button
                key={floor}
                className={`floor-button ${
                  selectedFloor === floor ? 'active' : ''
                }`}
                onClick={() => handleFloorChange(floor)}
              >
                {floor}F
              </button>
            ))}
          </div>
        </div>

        <div className="floor-info">
          <h2>{selectedFloor}층 강의실</h2>
          <p className="floor-description">이용 가능한 강의실 목록입니다</p>
        </div>

        <div className="rooms-grid">
          {floorRoomNumbers[selectedFloor]?.map((roomId) => {
            const roomCode = `11${String(selectedFloor).padStart(
              2,
              '0'
            )}${String(roomId).padStart(2, '0')}`;
            const isAvailable = availableRooms.includes(roomCode);

            return (
              <div
                key={roomId}
                className={`room-card ${isAvailable ? '' : 'unavailable-room'}`}
                onClick={() => handleRoomClick(roomId)}
              >
                <div className="room-number">{roomId}</div>
                <div className="room-name">
                  {`11${String(selectedFloor).padStart(2, '0')}${String(
                    roomId
                  ).padStart(2, '0')}`}
                </div>
                <div
                  className={`room-status ${
                    isAvailable ? 'available' : 'unavailable'
                  }`}
                >
                  {isAvailable ? '정보 있음' : '정보 없음'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Build11;
