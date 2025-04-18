import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../component/build.css';

const Build05 = () => {
  const { buildingId } = useParams();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const navigate = useNavigate();

  const floorRoomNumbers = {
    1: [12],
    2: [],
    3: [49, 50, 51],
    4: [30, 31, 32, 35, 36, 40],
    5: [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 16, 17, 21],
    6: [3, 4, 6, 7, 8, 9, 10, 15, 16],
    7: [1, 2, 3, 4, 5, 8, 9],
  };

  const availableRooms = [
    '050112',
    '050349',
    '050350',
    '050351',
    '050430',
    '050431',
    '050432',
    '050435',
    '050436',
    '050440',
    '050501',
    '050503',
    '050504',
    '050505',
    '050506',
    '050508',
    '050510',
    '050511',
    '050512',
    '050514',
    '050516',
    '050517',
    '050521',
    '050603',
    '050604',
    '050606',
    '050607',
    '050608',
    '050609',
    '050610',
    '050615',
    '050616',
    '050701',
    '050702',
    '050703',
    '050704',
    '050705',
    '050708',
    '050709',
  ];

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
  };

  const handleRoomClick = (roomId) => {
    const roomCode = `05${String(selectedFloor).padStart(2, '0')}${String(
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
          <h1>{buildingId}번 건물 - 경상대학</h1>
        </div>
      </header>

      <div className="content-wrapper">
        <div className="floor-selector">
          <div className="floor-buttons">
            {[1, 2, 3, 4, 5, 6, 7].map((floor) => (
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
            const roomCode = `05${String(selectedFloor).padStart(
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
                  {`05${String(selectedFloor).padStart(2, '0')}${String(
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

export default Build05;
