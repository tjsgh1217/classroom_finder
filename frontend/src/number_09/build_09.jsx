import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './build_09.css';

const Build09 = () => {
  const { buildingId } = useParams();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const navigate = useNavigate();

  const floorRoomNumbers = {
    1: [6, 19],
    2: [19],
    3: [20, 27],
    4: [8, 9, 10, 11, 20, 25],
    5: [16, 17, 18, 19, 20, 22],
  };

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
  };

  const handleRoomClick = (roomId) => {
    if (selectedFloor === 4 && roomId === 25) {
      navigate(`/building/${buildingId}/room/090425`);
    } else {
      alert(`${selectedFloor}층 강의실 ${roomId} 정보는 준비 중입니다.`);
    }
  };

  return (
    <div className="building-detail-container">
      <div className="building-header">
        <h1>{buildingId}번 건물</h1>
        <button className="back-button" onClick={() => navigate('/loadmap')}>
          돌아가기
        </button>
      </div>

      <div className="floor-buttons">
        {[1, 2, 3, 4, 5].map((floor) => (
          <button
            key={floor}
            className={`floor-button ${
              selectedFloor === floor ? 'active' : ''
            }`}
            onClick={() => handleFloorChange(floor)}
          >
            {floor}층
          </button>
        ))}
      </div>

      <div className="rooms-container">
        <h2>{selectedFloor}층 강의실</h2>
        <div className="rooms-grid">
          {floorRoomNumbers[selectedFloor]?.map((roomId) => (
            <button
              key={roomId}
              className="room-button"
              onClick={() => handleRoomClick(roomId)}
            >
              강의실 {roomId}
              {selectedFloor === 4 && roomId === 25 && ' ✓'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Build09;
