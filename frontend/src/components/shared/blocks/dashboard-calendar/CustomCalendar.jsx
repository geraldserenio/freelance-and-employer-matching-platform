import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import styled from "styled-components";
import { getProjectByDeadlineService } from "../../../../services/project/project-service";

const CustomCalendar = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    async function fetchProjectByDeadline() {
      const date = new Date(selectedDate);

      const year = date?.getFullYear();
      const month = String(date?.getMonth() + 1)?.padStart(2, "0"); // Months are 0-indexed
      const day = String(date?.getDate())?.padStart(2, "0");

      const formatted = `${year}-${month}-${day}`;

      const result = await getProjectByDeadlineService(formatted);
      props?.setCalendarEvents(result?.data?.result?.data);
    }
    fetchProjectByDeadline();
  }, [selectedDate]);

  return (
    <CalendarContainer>
      <StyledCalendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const isToday = new Date().toDateString() === date.toDateString();
            const isSelected =
              selectedDate.toDateString() === date.toDateString();
            const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday = 0, Saturday = 6

            if (isSelected) return "selected-day";
            if (isToday) return "today-day";
            if (isWeekend) return "weekend-day";
          }
          return "";
        }}
      />
    </CalendarContainer>
  );
};

export default CustomCalendar;

// Styled Components
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  width: 100%;
`;

const StyledCalendar = styled(Calendar)`
  border: none !important;
  width: 100% !important;
  max-width: none !important;
  background: transparent !important;
  font-family: Arial, sans-serif !important;

  .react-calendar__navigation {
    background: none !important;
    display: flex;
    justify-content: space-between;
  }

  .react-calendar__navigation button {
    background: none !important;
    color: #333 !important;
    font-size: 1rem !important;
    font-weight: bold !important;
    border: none !important;
    cursor: pointer;
    padding: 0.5em;
  }

  /* Day Tiles */
  .react-calendar__tile {
    padding: 10px !important;
    border-radius: 8px !important;
    transition: background 0.3s !important;
    border: none !important; /* Ensure no border */
    box-shadow: none !important; /* Remove any box shadow */
  }

  /* Remove Dashed Bottom Borders */
  .react-calendar__month-view__days__day {
    border-bottom: none !important;
  }

  /* Ensure no underline on numbers */
  .react-calendar__tile abbr {
    text-decoration: none !important;
  }

  /* Selected Day */
  .selected-day {
    background: #118ab2 !important;
    color: white !important;
    border-radius: 100px !important;
  }

  /* Today's Date (Only highlighted if not selected) */
  .today-day {
    background: #ffd166 !important;
    color: black !important;
    border-radius: 100px !important;
  }

  /* Remove Default Red for Weekends */
  .weekend-day {
    color: inherit !important; /* Remove red */
  }

  /* Hover Effect */
  .react-calendar__tile:hover {
    background: rgba(0, 123, 255, 0.1) !important;
    border-radius: 100px !important;
  }

  /* Remove Focus Outline */
  .react-calendar__tile:focus {
    outline: none !important;
  }

  /* Remove Outer Border */
  .react-calendar,
  .react-calendar * {
    border: none !important;
  }
`;
