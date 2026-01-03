import React, { useState, useMemo } from "react";

interface Task {
  year: number;
  month: number;
  day: number;
  projectId: string;
}

export interface CalendarDay {
  year: number;
  month: number;
  day: number;
  isCurrentMonth: boolean;
  isTaskExists: boolean;
}

export interface Props {
  tasks: Task[];
  onPressDay?: (day: number) => void;
}

export const VerticalCalendar: React.FC<Props> = ({ tasks, onPressDay }) => {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const handleMoveUp = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleMoveDown = () => {
    const nextMonth = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + 1,
      1
    );
    if (nextMonth > today) return;
    setViewDate(nextMonth);
  };

  const handleGoToToday = () => {
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const calendarData = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const yearOfPrevMonth = new Date(year, month, 0).getFullYear();
    const prevMonth = new Date(year, month, 0).getMonth();
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    const yearOfNextMonth = new Date(year, month + 1, 1).getFullYear();
    const nextMonth = new Date(year, month + 1, 1).getMonth();

    const days: CalendarDay[] = [];

    const filteredTasks = tasks.filter(
      (day) =>
        (day.year === year && day.month === month) ||
        (day.year === yearOfPrevMonth && day.month === prevMonth) ||
        (day.year === yearOfNextMonth && day.month === nextMonth)
    );

    // 1. 이전 달의 마지막 주 날짜들
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const isDayExists = filteredTasks.findIndex(
        (day) =>
          day.year === yearOfPrevMonth &&
          day.month === prevMonth &&
          day.day === prevMonthLastDate - i
      );
      days.push({
        year: yearOfPrevMonth,
        month: prevMonth,
        day: prevMonthLastDate - i,
        isCurrentMonth: false,
        isTaskExists: isDayExists !== -1,
      });
    }

    // 2. 현재 달의 날짜들
    for (let i = 1; i <= lastDate; i++) {
      const isDayExists = filteredTasks.findIndex(
        (day) => day.year === year && day.month === month && day.day === i
      );
      days.push({
        year,
        month,
        day: i,
        isCurrentMonth: true,
        isTaskExists: isDayExists !== -1,
      });
    }

    // 3. 다음 달의 날짜들 (항상 6주 - 42칸을 채우도록 수정)
    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const isDayExists = filteredTasks.findIndex(
        (day) =>
          day.year === yearOfNextMonth &&
          day.month === nextMonth &&
          day.day === i
      );
      days.push({
        year: yearOfNextMonth,
        month: nextMonth,
        day: i,
        isCurrentMonth: false,
        isTaskExists: isDayExists !== -1,
      });
    }

    return days;
  }, [viewDate, tasks]);

  const showGoToToday = useMemo(() => {
    const monthDiff =
      (today.getFullYear() - viewDate.getFullYear()) * 12 +
      (today.getMonth() - viewDate.getMonth());
    return Math.abs(monthDiff) >= 3;
  }, [viewDate, today]);

  const isCurrentMonth =
    viewDate.getFullYear() === today.getFullYear() &&
    viewDate.getMonth() === today.getMonth();

  return (
    <div className="relative flex flex-col w-full h-full max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
      {/* 상단 컨트롤 - 위로 이동 */}
      <div className="flex justify-center bg-gray-50 border-b border-gray-100">
        <button
          onClick={handleMoveUp}
          className="hover:bg-gray-200 rounded-full transition-colors cursor-pointer focus:outline-none p-2"
          aria-label="이전 달로 이동"
          tabIndex={0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>

      {/* 달력 본문 영역 */}
      <div className="flex-1 overflow-hidden relative bg-white">
        <div className="h-full flex flex-col p-4">
          <div className="self-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
            </h2>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-gray-400 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 flex-1">
            {calendarData.map((item, i) => (
              <div
                key={i}
                className={`aspect-square flex flex-col text-sm rounded-lg transition-colors border-2 ${
                  item.isCurrentMonth
                    ? "text-gray-700 hover:bg-blue-50 cursor-pointer border-gray-100"
                    : "text-gray-300 border-transparent opacity-80 pointer-events-none"
                } ${
                  item.isCurrentMonth &&
                  item.day === today.getDate() &&
                  isCurrentMonth
                    ? "bg-blue-50 border-blue-200 font-bold"
                    : ""
                }`}
                tabIndex={item.isCurrentMonth ? 0 : -1}
                onClick={() => onPressDay?.(item.day)}
              >
                <p className="text-sm self-start p-1">{item.day}</p>
                {item.isTaskExists && <p className="self-center">✅</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 컨트롤 - 아래로 이동 */}
      <div className="flex justify-center bg-gray-50 border-t border-gray-100 relative">
        <button
          onClick={handleMoveDown}
          disabled={isCurrentMonth}
          className={`hover:bg-gray-200 rounded-full transition-colors focus:outline-none p-2 ${
            isCurrentMonth ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label="다음 달로 이동"
          tabIndex={isCurrentMonth ? -1 : 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {/* 오늘로 이동 버튼 (조건부 렌더링) */}
        {showGoToToday && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button
              onClick={handleGoToToday}
              className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all text-sm font-medium cursor-pointer whitespace-nowrap"
              aria-label="오늘 날짜로 이동"
              tabIndex={0}
            >
              오늘로 이동
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
