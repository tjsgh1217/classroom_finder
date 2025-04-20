import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Loadmap.css';

const Loadmap = () => {
  const navigate = useNavigate();

  const handleBuildingClick = (buildingId) => {
    navigate(`/building/${buildingId}`);
  };

  return (
    <div className="loadmap">
      <div className="loadmap__image-wrapper">
        <img src="/campusMap.jpg" alt="Campus Map" className="loadmap__image" />

        <button
          className="loadmap__building loadmap__building-09"
          style={{ top: '12.5%', left: '44.5%' }}
          onClick={() => handleBuildingClick(9)}
        >
          09
        </button>
        <button
          className="loadmap__building loadmap__building-56"
          style={{ top: '67.5%', left: '41.5%' }}
          onClick={() => handleBuildingClick(56)}
        >
          56
        </button>
        <button
          className="loadmap__building loadmap__building-06"
          style={{ top: '17%', left: '55.2%' }}
          onClick={() => handleBuildingClick(6)}
        >
          06
        </button>
        <button
          className="loadmap__building loadmap__building-04"
          style={{ top: '40%', left: '68.5%' }}
          onClick={() => handleBuildingClick(4)}
        >
          04
        </button>
        <button
          className="loadmap__building loadmap__building-05"
          style={{ top: '51%', left: '64%' }}
          onClick={() => handleBuildingClick(5)}
        >
          05
        </button>
        <button
          className="loadmap__building loadmap__building-11"
          style={{ top: '40%', left: '57%' }}
          onClick={() => handleBuildingClick(11)}
        >
          11
        </button>
        <button
          className="loadmap__building loadmap__building-02"
          style={{ top: '28%', left: '63.6%' }}
          onClick={() => handleBuildingClick(2)}
        >
          02
        </button>
        <button
          className="loadmap__building loadmap__building-03"
          style={{ top: '37.5%', left: '32.5%' }}
          onClick={() => handleBuildingClick(3)}
        >
          03
        </button>
        <button
          className="loadmap__building loadmap__building-26"
          style={{ top: '45.9%', left: '59.2%' }}
          onClick={() => handleBuildingClick(26)}
        >
          26
        </button>
        <button
          className="loadmap__building loadmap__building-07"
          style={{ top: '75.5%', left: '51%' }}
          onClick={() => handleBuildingClick(7)}
        >
          07
        </button>
        <button
          className="loadmap__building loadmap__building-50"
          style={{ top: '81%', left: '83%' }}
          onClick={() => handleBuildingClick(50)}
        >
          50
        </button>
        <button
          className="loadmap__building loadmap__building-42"
          style={{ top: '73.2%', left: '77%' }}
          onClick={() => handleBuildingClick(42)}
        >
          42
        </button>
        <button
          className="loadmap__building loadmap__building-45"
          style={{ top: '67.5%', left: '81%' }}
          onClick={() => handleBuildingClick(45)}
        >
          45
        </button>
        <button
          className="loadmap__building loadmap__building-47"
          style={{ top: '78.5%', left: '75.5%' }}
          onClick={() => handleBuildingClick(47)}
        >
          47
        </button>
      </div>
    </div>
  );
};

export default Loadmap;
