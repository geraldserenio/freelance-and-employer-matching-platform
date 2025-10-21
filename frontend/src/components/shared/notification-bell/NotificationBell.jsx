import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FiBell } from "react-icons/fi";
import { BsDot } from "react-icons/bs";

const NotificationBell = ({ notifications = [], borderColor = "#ccc" }) => {
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleClickOutside = (e) => {
    if (bellRef.current && !bellRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleItemClick = (url) => {
    window.location.href = url;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <BellWrapper ref={bellRef}>
      <BellButton onClick={toggleDropdown} borderColor={borderColor}>
        <FiBell size={20} />
        {notifications.length > 0 && <NotificationDot />}
      </BellButton>

      {open && (
        <Dropdown>
          {notifications.length === 0 ? (
            <DropdownItem>No notifications</DropdownItem>
          ) : (
            notifications.map((notif, idx) => (
              <DropdownItem
                key={idx}
                onClick={() => handleItemClick(notif.url)}
              >
                <NotifHeader>
                  <BsDot size={22} color="#4a90e2" />
                  {notif.title}
                </NotifHeader>
                {notif.message && <NotifBody>{notif.message}</NotifBody>}
                {notif.time && <NotifFooter>{notif.time}</NotifFooter>}
              </DropdownItem>
            ))
          )}
        </Dropdown>
      )}
    </BellWrapper>
  );
};

export default NotificationBell;

const BellWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const BellButton = styled.button`
  border: 2px solid ${({ borderColor }) => borderColor || "#ccc"};
  border-radius: 50%;
  padding: 10px;
  background: white;
  cursor: pointer;
  position: relative;
`;

const NotificationDot = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 10px;
  height: 10px;
  background-color: #ff3b3b;
  border-radius: 50%;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 48px;
  right: 0;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  width: 300px;
  max-height: 350px;
  overflow-y: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  z-index: 10;
  padding: 0;
  margin: 0;
`;

const DropdownItem = styled.li`
  list-style: none;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #f8f9fc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotifHeader = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.95rem;
  color: #2c3e50;
`;

const NotifBody = styled.div`
  font-size: 0.85rem;
  color: #6c7a89;
`;

const NotifFooter = styled.div`
  font-size: 0.75rem;
  color: #a0a0a0;
  margin-top: 4px;
`;
