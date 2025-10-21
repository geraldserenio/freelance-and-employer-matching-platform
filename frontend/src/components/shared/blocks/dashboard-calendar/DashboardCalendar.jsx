import styled from "styled-components";
import { SecondaryButtonStyle } from "../../button/buttonsStyles";
import CalendarEvents from "./CalendarEvents";
import CustomCalendar from "./CustomCalendar";
import { useState } from "react";

const DashboardCalendar = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);

  return (
    <Container>
      <CalendarHeader>
        <CalendarTitle>Calendar</CalendarTitle>
        <SecondaryButtonStyle>Add Event</SecondaryButtonStyle>
      </CalendarHeader>

      <CalendarBody>
        <EventSection>
          <EventDateContainer>
            <EventDay>5</EventDay>
            <EventDetails>
              <EventWeekday>Wed,</EventWeekday>
              <EventMonth>Feb</EventMonth>
            </EventDetails>
          </EventDateContainer>
          {calendarEvents?.length > 0
            ? calendarEvents?.map((event, index) => (
                <CalendarEvents
                  key={index}
                  eventName={event.project_name}
                  date={event.deadline}
                  duration={event.timeline}
                  withMeeting={false}
                />
              ))
            : "No Records"}
        </EventSection>
        <CalendarSection>
          <CustomCalendar setCalendarEvents={setCalendarEvents} />
        </CalendarSection>
      </CalendarBody>
    </Container>
  );
};

export default DashboardCalendar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarHeader = styled.div`
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CalendarTitle = styled.div`
  font-size: 1.5rem;
`;

const CalendarBody = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
  gap: 2em;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const EventSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const EventDateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  width: fit-content;
`;

const EventDay = styled.div`
  font-size: 40px;
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventWeekday = styled.div`
  font-size: 1rem;
`;

const EventMonth = styled.div`
  font-size: 1rem;
`;

const CalendarSection = styled.div`
  flex: 1;
`;
