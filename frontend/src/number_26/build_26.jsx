import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api.ts';
import '../component/build.css';
import { toZonedTime } from 'date-fns-tz';

const Build26 = () => {
  const { buildingId } = useParams();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [roomSchedules, setRoomSchedules] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const floorRoomNumbers = {
    1: [7],
    2: [14, 15, 16, 22, 23, 28, 29],
    3: [],
  };

  const availableRooms = [
    '260107',
    '260214',
    '260215',
    '260216',
    '260222',
    '260223',
    '260228',
    '260229',
  ];

  const parseTimeSlot = (timeCode) => {
    const day = timeCode.charAt(0);
    const periodCode = timeCode.substring(1);

    if (isNaN(periodCode)) {
      switch (periodCode) {
        case 'A':
          return { day, start: '09:00', end: '10:15' };
        case 'B':
          return { day, start: '10:30', end: '11:45' };
        case 'C':
          return { day, start: '12:00', end: '13:15' };
        case 'D':
          return { day, start: '13:30', end: '14:45' };
        case 'E':
          return { day, start: '15:00', end: '16:15' };
        case 'F':
          return { day, start: '16:30', end: '17:45' };
        default:
          return null;
      }
    } else {
      const period = parseInt(periodCode);
      switch (period) {
        case 0:
          return { day, start: '08:00', end: '08:50' };
        case 1:
          return { day, start: '09:00', end: '09:50' };
        case 2:
          return { day, start: '10:00', end: '10:50' };
        case 3:
          return { day, start: '11:00', end: '11:50' };
        case 4:
          return { day, start: '12:00', end: '12:50' };
        case 5:
          return { day, start: '13:00', end: '13:50' };
        case 6:
          return { day, start: '14:00', end: '14:50' };
        case 7:
          return { day, start: '15:00', end: '15:50' };
        case 8:
          return { day, start: '16:00', end: '16:50' };
        case 9:
          return { day, start: '17:00', end: '17:50' };
        case 10:
          return { day, start: '18:00', end: '18:50' };

        default:
          return null;
      }
    }
  };

  const parseTimeCode = (timeCode) => {
    const slots = [];
    const parts = timeCode.split('/');

    let currentDay = '';
    for (const part of parts) {
      if (['월', '화', '수', '목', '금'].includes(part.charAt(0))) {
        currentDay = part.charAt(0);
        const period = part.substring(1);
        slots.push(parseTimeSlot(currentDay + period));
      } else {
        slots.push(parseTimeSlot(currentDay + part));
      }
    }

    return slots;
  };

  const isRoomOccupiedNow = (roomCode) => {
    if (!roomSchedules[roomCode]) return false;

    const now = new Date();
    const koreaTime = toZonedTime(now, 'Asia/Seoul');

    const daysMap = ['일', '월', '화', '수', '목', '금', '토'];
    const currentDay = daysMap[koreaTime.getDay()];

    const currentHour = koreaTime.getHours();
    const currentMinute = koreaTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    const todayLectures = roomSchedules[roomCode][currentDay] || [];

    return todayLectures.some((lecture) => {
      const [startHour, startMin] = lecture.start.split(':').map(Number);
      const [endHour, endMin] = lecture.end.split(':').map(Number);

      const lectureStartInMinutes = startHour * 60 + startMin;
      const lectureEndInMinutes = endHour * 60 + endMin;

      return (
        currentTimeInMinutes >= lectureStartInMinutes &&
        currentTimeInMinutes < lectureEndInMinutes
      );
    });
  };

  useEffect(() => {
    const fetchBuildingSchedules = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/courses/building?code=26`);
        const buildingData = response.data;

        const schedules = {};
        Object.entries(buildingData).forEach(([roomCode, courses]) => {
          const lecturesByDay = {};

          courses.forEach((course) => {
            const timeSlots = parseTimeCode(course.time);

            timeSlots.forEach((slot) => {
              if (slot) {
                if (!lecturesByDay[slot.day]) {
                  lecturesByDay[slot.day] = [];
                }

                lecturesByDay[slot.day].push({
                  start: slot.start,
                  end: slot.end,
                  title: course.courseName,
                });
              }
            });
          });

          schedules[roomCode.split('-')[0]] = lecturesByDay;
        });

        setRoomSchedules(schedules);
        setLoading(false);
      } catch (err) {
        console.error('강의실 데이터를 가져오는 중 오류 발생:', err);
        setError('강의실 데이터를 불러올 수 없습니다.');
        setLoading(false);
      }
    };

    fetchBuildingSchedules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
  };

  const handleRoomClick = (roomId) => {
    const roomCode = `26${String(selectedFloor).padStart(2, '0')}${String(
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
          <h1>{buildingId}번 건물 - 정성균선교관</h1>
        </div>
      </header>

      <div className="content-wrapper">
        <div className="floor-selector">
          <div className="floor-buttons">
            {[1, 2, 3].map((floor) => (
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

        {loading ? (
          <div className="loading-message">강의실 데이터를 불러오는 중...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="rooms-grid">
            {floorRoomNumbers[selectedFloor]?.map((roomId) => {
              const roomCode = `26${String(selectedFloor).padStart(
                2,
                '0'
              )}${String(roomId).padStart(2, '0')}`;
              const isAvailable = availableRooms.includes(roomCode);
              const isOccupied = isRoomOccupiedNow(roomCode);

              return (
                <div
                  key={roomId}
                  className={`room-card ${
                    isAvailable ? '' : 'unavailable-room'
                  }`}
                  onClick={() => handleRoomClick(roomId)}
                >
                  <div className="room-number">{roomId}</div>
                  <div className="room-name">{roomCode}</div>
                  <div
                    className={`room-status ${
                      !isAvailable
                        ? 'unavailable'
                        : isOccupied
                        ? 'occupied'
                        : 'available'
                    }`}
                    style={{
                      backgroundColor: !isAvailable
                        ? '#adb5bd'
                        : isOccupied
                        ? '#ff6b6b'
                        : '#51cf66',
                      color: 'white',
                    }}
                  >
                    {!isAvailable
                      ? '정보 없음'
                      : isOccupied
                      ? '강의 중'
                      : '빈 강의실'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Build26;
