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
      <img src="/campusMap.jpg" alt="Campus Map" className="loadmap__image" />

      <button
        className="loadmap__building loadmap__building-09"
        style={{ top: '10.5%', left: '44.5%' }}
        onClick={() => handleBuildingClick(9)}
      >
        09
      </button>
      <button
        className="loadmap__building loadmap__building-56"
        style={{ top: '65.5%', left: '41.5%' }}
        onClick={() => handleBuildingClick(56)}
      >
        56
      </button>
      <button
        className="loadmap__building loadmap__building-06"
        style={{ top: '15.5%', left: '52.5%' }}
        onClick={() => handleBuildingClick(6)}
      >
        06
      </button>
      <button
        className="loadmap__building loadmap__building-04"
        style={{ top: '37.5%', left: '63.5%' }}
        onClick={() => handleBuildingClick(4)}
      >
        04
      </button>
      <button
        className="loadmap__building loadmap__building-05"
        style={{ top: '49.5%', left: '59.5%' }}
        onClick={() => handleBuildingClick(5)}
      >
        05
      </button>
      <button
        className="loadmap__building loadmap__building-11"
        style={{ top: '37.5%', left: '55%' }}
        onClick={() => handleBuildingClick(11)}
      >
        11
      </button>
      <button
        className="loadmap__building loadmap__building-02"
        style={{ top: '26.5%', left: '59.5%' }}
        onClick={() => handleBuildingClick(2)}
      >
        02
      </button>
      <button
        className="loadmap__building loadmap__building-03"
        style={{ top: '35.5%', left: '34.5%' }}
        onClick={() => handleBuildingClick(3)}
      >
        03
      </button>
      <button
        className="loadmap__building loadmap__building-26"
        style={{ top: '43.7%', left: '56.2%' }}
        onClick={() => handleBuildingClick(26)}
      >
        26
      </button>
      <button
        className="loadmap__building loadmap__building-07"
        style={{ top: '72.5%', left: '49%' }}
        onClick={() => handleBuildingClick(7)}
      >
        07
      </button>
      <button
        className="loadmap__building loadmap__building-50"
        style={{ top: '77.5%', left: '75%' }}
        onClick={() => handleBuildingClick(50)}
      >
        50
      </button>
      <button
        className="loadmap__building loadmap__building-42"
        style={{ top: '71.5%', left: '70.5%' }}
        onClick={() => handleBuildingClick(42)}
      >
        42
      </button>
      <button
        className="loadmap__building loadmap__building-45"
        style={{ top: '65.5%', left: '74%' }}
        onClick={() => handleBuildingClick(45)}
      >
        45
      </button>
      <button
        className="loadmap__building loadmap__building-47"
        style={{ top: '76.5%', left: '69.5%' }}
        onClick={() => handleBuildingClick(47)}
      >
        47
      </button>
    </div>
  );
};

export default Loadmap;
