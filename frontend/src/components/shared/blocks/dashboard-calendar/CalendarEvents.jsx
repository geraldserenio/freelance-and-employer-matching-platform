import styled from "styled-components";

const CalendarEvents = ({
  eventName = "Event",
  date = "5 Feb, 2025",
  duration = "9am - 10am",
  withMeeting = true,
}) => {
  return (
    <EventContainer>
      <EventDetails>
        <EventName>{eventName}</EventName>
        <EventInfo>
          <span>Deadline: {date}</span>
          <span>Timeline: {duration}</span>
        </EventInfo>
      </EventDetails>
      {withMeeting && (
        <SecondaryButtonStyle style={{ background: "#EFF7FA" }}>
          Join Meeting
        </SecondaryButtonStyle>
      )}
    </EventContainer>
  );
};

export default CalendarEvents;

// Styled Components

const SecondaryButtonStyle = styled.button`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #118ab2; /* Primary blue text */
  background-color: #ffffff; /* White background */
  border: 1px solid #118ab2; /* Primary blue border */
  border-radius: 25px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #ccc;
    color: #ccc;
    cursor: not-allowed;
  }
`;
const EventContainer = styled.div`
  background: #eff7fa;
  padding: 2em;
  border-radius: 12px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventName = styled.div`
  font-size: 1.3em;
  font-weight: 500;
`;

const EventInfo = styled.div`
  display: flex;
  gap: 1em;
  font-size: 0.9em;
  color: #555;
`;
