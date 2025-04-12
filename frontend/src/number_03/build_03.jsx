import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './build_03.css';

const Build03 = () => {
  const { buildingId } = useParams();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const navigate = useNavigate();

  const floorRoomNumbers = {
    1: [2],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [1, 3],
    7: [],
    8: [],
  };

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
  };

  const handleRoomClick = (roomId) => {
    if (selectedFloor === 4 && roomId === 25) {
      navigate(`/building/${buildingId}/room/090425`);
    } else if (selectedFloor === 1 && roomId === 6) {
      navigate(`/building/${buildingId}/room/090522`);
    } else {
      alert(`${selectedFloor}층 강의실 ${roomId} 정보는 준비 중입니다.`);
    }
  };

  return (
    <div className="building-detail-container">
      <div className="building-header">
        <h1>{buildingId}번 건물 - 사범대학</h1>
        <button className="back-button" onClick={() => navigate('/loadmap')}>
          돌아가기
        </button>
      </div>

      <div className="floor-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((floor) => (
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

export default Build03;
