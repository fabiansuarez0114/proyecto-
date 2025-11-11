"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type CalendarioProps = {
  selectedDays: Date[];
  toggleDaySelection: (day: Date) => void;
};

export default function Calendario({ selectedDays, toggleDaySelection }: CalendarioProps) {
  const sortUniqueDates = (dates: Date[]) => {
    const unique = Array.from(new Map(dates.map((d) => [d.toDateString(), d])).values());
    return unique.sort((a, b) => a.getTime() - b.getTime());
  };

  return (
    <div className="border rounded-lg p-2 bg-white">
      <Calendar
        onClickDay={(value) => toggleDaySelection(value as Date)}
        tileClassName={({ date }) => {
          const selected = selectedDays.some((d) => d.toDateString() === date.toDateString());
          return selected ? "selected-day" : "";
        }}
      />
      <style jsx global>{`
        .react-calendar {
          border: none !important;
          width: 100%;
        }
        .react-calendar__tile--active,
        .selected-day {
          background-color: #3b82f6 !important;
          color: white !important;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
