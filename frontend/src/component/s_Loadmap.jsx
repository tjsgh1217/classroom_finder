import React from 'react';
import { useNavigate } from 'react-router-dom';
import './s_Loadmap.css';

const SecondLoadmap = () => {
  const navigate = useNavigate();

  const handleBuildingClick = (buildingId) => {
    navigate(`/building/${buildingId}`);
  };

  return (
    <div className="loadmap">
      <div className="loadmap__image-wrapper">
        <img
          src="/secondCampusMap.jpeg"
          alt="Campus Map"
          className="loadmap__image"
        />
        <button
          className="loadmap__building loadmap__building-71"
          style={{ top: '38.2%', left: '59.2%' }}
          onClick={() => handleBuildingClick(71)}
        >
          71
        </button>
        <button
          className="loadmap__building loadmap__building-72"
          style={{ top: '32.5%', left: '75%' }}
          onClick={() => handleBuildingClick(72)}
        >
          72
        </button>
        <button
          className="loadmap__building loadmap__building-73"
          style={{ top: '46%', left: '42.5%' }}
          onClick={() => handleBuildingClick(73)}
        >
          73
        </button>
        <button
          className="loadmap__building loadmap__building-74"
          style={{ top: '27%', left: '54.9%' }}
          onClick={() => handleBuildingClick(74)}
        >
          74
        </button>
        <button
          className="loadmap__building loadmap__building-78"
          style={{ top: '38.6%', left: '21.9%' }}
          onClick={() => handleBuildingClick(78)}
        >
          78
        </button>
      </div>
    </div>
  );
};

export default SecondLoadmap;
