import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../component/build.css';

const Build06 = () => {
  const { buildingId } = useParams();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const navigate = useNavigate();

  const floorRoomNumbers = {
    B1: [1, 2],
    1: [7, 14],
    2: [1, 12, 13, 17, 25, 28, 30],
    3: [11, 26, 34, 35],
    4: [2, 3, 4, 5, 6, 7, 9, 10, 17, 19, 20, 24, 33],
    5: [1, 3, 4, 5, 6, 11, 10, 17, 20, 26, 27, 28, 29],
  };

  const availableRooms = [
    '06B101',
    '06B102',
    '060107',
    '060114',
    '060201',
    '060225',
    '060230',
    '060212',
    '060213',
    '060217',
    '060228',
    '060311',
    '060326',
    '060334',
    '060335',
    '060402',
    '060403',
    '060404',
    '060405',
    '060406',
    '060407',
    '060409',
    '060410',
    '060417',
    '060419',
    '060420',
    '060424',
    '060433',
    '060501',
    '060503',
    '060504',
    '060505',
    '060506',
    '060510',
    '060511',
    '060517',
    '060520',
    '060526',
    '060527',
    '060528',
    '060529',
  ];

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
  };

  const handleRoomClick = (roomId) => {
    const roomCode = `06${String(selectedFloor).padStart(2, '0')}${String(
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
          <h1>{buildingId}번 건물 - 계의돈기념관</h1>
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
            const roomCode = `06${String(selectedFloor).padStart(
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
                  {`06${String(selectedFloor).padStart(2, '0')}${String(
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

export default Build06;
