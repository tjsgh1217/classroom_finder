import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './build_09.css';

const Build09 = () => {
  const { buildingId } = useParams();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const navigate = useNavigate();

  const floorPlans = {
    1: '/09_1f.jpeg',
    2: '/09_2f.jpeg',
    3: '/09_3f.jpeg',
    4: '/09_4f.jpeg',
    5: '/09_5f.jpeg',
  };

  const floorRoomNumbers = {
    1: [1, 2, 13],
    2: [21, 22],
    3: [31, 32, 33, 34],
    4: [41, 42, 25],
    5: [51],
  };

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
  };

  const handleRoomClick = (roomId) => {
    if (selectedFloor === 4 && roomId === 25) {
      navigate(`/building/${buildingId}/room/090425`);
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

      <div className="floor-and-buttons-wrapper">
        <div className="floor-plan-container">
          <div className="floor-plan">
            <img
              src={floorPlans[selectedFloor]}
              alt={`${selectedFloor}층 도면`}
              className="floor-plan-image"
            />
          </div>
        </div>

        <div className="additional-buttons-container">
          {floorRoomNumbers[selectedFloor]?.map((roomId) => (
            <button
              key={roomId}
              className="additional-button"
              onClick={() => handleRoomClick(roomId)}
            >
              강의실 {roomId}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Build09;
