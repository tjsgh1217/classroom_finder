import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './room090425.css';

const ClassRoom09_04_25 = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('월');

  const days = ['월', '화', '수', '목', '금'];
  const lectures = {
    월: [
      { start: '12:15', end: '14:00', title: '데이터통신' },
      { start: '15:00', end: '16:00', title: '컴퓨터구조' },
    ],
    화: [{ start: '10:00', end: '12:00', title: '운영체제' }],
    수: [{ start: '17:15', end: '18:5', title: '자바' }],
  };

  const currentRoom = roomId;
  const timeSlots = Array.from({ length: 10 }, (_, i) => i + 9);

  const renderTimeTableGrid = () => {
    return (
      <div className="timetable-grid">
        <div className="time-header">시간</div>
        {days.map((day) => (
          <div
            key={day}
            className={`day-header ${day === selectedDay ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </div>
        ))}

        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            <div className="time-slot">{`${time}:00`}</div>
            {days.map((day) => {
              const lectureList = lectures[day] || [];

              return (
                <div
                  key={`${day}-${time}`}
                  className={`grid-cell ${
                    day === selectedDay ? 'active-column' : ''
                  }`}
                >
                  {lectureList.map((lecture, idx) => {
                    const [startHour, startMin] = lecture.start
                      .split(':')
                      .map(Number);
                    const [endHour, endMin] = lecture.end
                      .split(':')
                      .map(Number);

                    const slotStart = time * 60;
                    const slotEnd = (time + 1) * 60;
                    const lectureStart = startHour * 60 + startMin;
                    const lectureEnd = endHour * 60 + endMin;

                    const isOverlap = !(
                      lectureEnd <= slotStart || lectureStart >= slotEnd
                    );
                    if (!isOverlap) return null;

                    const top = Math.max(
                      0,
                      ((lectureStart - slotStart) / 60) * 100
                    );
                    const bottom =
                      Math.min(1, (lectureEnd - slotStart) / 60) * 100;
                    const height = bottom - top;

                    return (
                      <div
                        key={idx}
                        className="lecture-color-fill"
                        style={{
                          top: `${top}%`,
                          height: `${height}%`,
                        }}
                        title={`${lecture.title} (${lecture.start}~${lecture.end})`}
                      />
                    );
                  })}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderLectureList = () => {
    return days.map((day) => {
      const dayLectures = lectures[day] || [];

      return (
        <div key={day} className="day-lecture-group">
          <h3 className="day-title">{day}</h3>
          {dayLectures.length === 0 ? (
            <p className="no-lectures">이 요일에는 강의가 없습니다.</p>
          ) : (
            <ul className="lecture-list">
              {dayLectures.map((lecture, index) => (
                <li key={index}>
                  {lecture.start}~{lecture.end} {lecture.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    });
  };

  return (
    <div className="classroom-schedule-container">
      <div className="classroom-header">
        <h1>{currentRoom} 강의실 시간표</h1>
        <button className="back-button" onClick={() => navigate(-1)}>
          돌아가기
        </button>
      </div>

      <div className="schedule-content">
        <div className="timetable-section">
          <h2>시간표</h2>
          {renderTimeTableGrid()}
        </div>

        <div className="lecture-list-section">
          <h2>강의 목록</h2>
          {renderLectureList()}
        </div>
      </div>
    </div>
  );
};

export default ClassRoom09_04_25;
