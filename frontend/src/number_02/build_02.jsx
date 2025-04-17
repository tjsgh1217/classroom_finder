import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../component/build.css';

const Build02 = () => {
  const { buildingId } = useParams();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const navigate = useNavigate();

  const floorRoomNumbers = {
    1: [1],
    2: [2, 3, 4, 5, 10, 11, 12],
    3: [5, 11, 12, 13],
    4: [1, 2, 3, 5, 6, 7, 8],
  };

  const availableRooms = [
    '020101',
    '020202',
    '020203',
    '020204',
    '020205',
    '020210',
    '020211',
    '020212',
    '020305',
    '020311',
    '020312',
    '020313',
    '020401',
    '020402',
    '020403',
    '020405',
    '020406',
    '020407',
    '020408',
  ];

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
  };

  const handleRoomClick = (roomId) => {
    const roomCode = `02${String(selectedFloor).padStart(2, '0')}${String(
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
          <h1>{buildingId}번 건물 - 탈메이지기념관</h1>
        </div>
      </header>

      <div className="content-wrapper">
        <div className="floor-selector">
          <div className="floor-buttons">
            {[1, 2, 3, 4].map((floor) => (
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
            const roomCode = `02${String(selectedFloor).padStart(
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
                  {`02${String(selectedFloor).padStart(2, '0')}${String(
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

export default Build02;
