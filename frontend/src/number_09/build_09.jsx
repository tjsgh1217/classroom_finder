import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../component/build.css';

const Build09 = () => {
  const { buildingId } = useParams();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const navigate = useNavigate();

  const floorRoomNumbers = {
    B1: [8, 10],
    1: [6, 19],
    2: [1, 2, 6, 10, 15, 21, 19],
    3: [2, 5, 7, 16, 20, 21, 25, 27],
    4: [1, 2, 5, 8, 9, 10, 11, 20, 24, 25],
    5: [1, 2, 3, 5, 16, 17, 18, 19, 20, 22, 24],
  };

  const availableRooms = [
    '09B108',
    '09B110',
    '090106',
    '090119',
    '090201',
    '090202',
    '090206',
    '090210',
    '090215',
    '090221',
    '090219',
    '090302',
    '090305',
    '090307',
    '090316',
    '090320',
    '090321',
    '090325',
    '090327',
    '090401',
    '090402',
    '090405',
    '090424',
    '090408',
    '090409',
    '090410',
    '090411',
    '090420',
    '090425',
    '090501',
    '090502',
    '090503',
    '090505',
    '090516',
    '090517',
    '090518',
    '090519',
    '090520',
    '090522',
    '090524',
  ];

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
  };

  const handleRoomClick = (roomId) => {
    const roomCode = `09${String(selectedFloor).padStart(2, '0')}${String(
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
          <h1>{buildingId}번 건물 - 공과대학</h1>
        </div>
      </header>

      <div className="content-wrapper">
        <div className="floor-selector">
          <div className="floor-buttons">
            {['B1', 1, 2, 3, 4, 5].map((floor) => (
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
            const roomCode = `09${String(selectedFloor).padStart(
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
                  {`09${String(selectedFloor).padStart(2, '0')}${String(
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

export default Build09;
