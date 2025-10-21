import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MessageSquare } from "lucide-react";
import { gray, primaryColor, white } from "../styles/color";
import { useDeviceInfo } from "../../../helper/deviceInfo";
import {
  getGuestConversation,
  sendGuestMessage,
} from "../../../services/messages/messages-service";
import { gap } from "../styles/sizes";
import { fontFamily } from "../styles/theme";
import { StyledInput } from "../inputs/LoginField";
import { generateIcon, Icon } from "../icons/generate-icon";
import { SaveButton } from "../../pages/projects/AddProject";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const deviceInfo = useDeviceInfo();
  const [fetchFlag, setFetchFlag] = useState();
  const [conversation, setConversation] = useState([]);
  const [guestFname, setGuestFname] = useState([]);
  const [guestLname, setGuestLname] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await sendGuestMessage({
      ip: deviceInfo?.fingerprintId,
      guestFname: guestFname,
      guestLname: guestLname,
      message: message,
    });

    setFetchFlag(!fetchFlag);
    setMessage("");
  };

  useEffect(() => {
    if (!deviceInfo) return;
    async function getGuestConversations() {
      const result = await getGuestConversation(deviceInfo?.fingerprintId);
      setConversation(result?.data?.result?.data);
    }
    getGuestConversations();
  }, [deviceInfo, fetchFlag]);

  const handleSetMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleSetguestLname = (event) => {
    setGuestLname(event.target.value);
  };

  const handleSetguestFname = (event) => {
    setGuestFname(event.target.value);
  };

  return (
    <>
      {isOpen && (
        <ChatBox>
          <ChatHeader>
            <div style={{ display: "flex", alignItems: "center", gap: gap }}>
              <Icon src={generateIcon("Chat")} /> Chat
            </div>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen(!isOpen)}
            >
              X
            </span>
          </ChatHeader>
          <ChatBody>
            {conversation?.length > 0 ? (
              conversation?.map((data, index) => {
                return (
                  <ConversationContainer key={index}>
                    <RowConversationContainer
                      style={{
                        justifyContent: data?.sender == "5" ? "start" : "end",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor:
                            data?.sender == "5" ? "" : primaryColor,
                          color: data?.sender == "5" ? "" : white,
                          padding: gap - 5,
                          paddingLeft: gap,
                          paddingRight: gap,
                          borderRadius: "12px",
                        }}
                      >
                        <Message>{data?.message}</Message>
                        <Name
                          style={{ color: data?.sender == "5" ? gray : white }}
                        >
                          {data?.sender == "5" ? "Customer Service" : "you"}
                        </Name>
                      </div>
                    </RowConversationContainer>
                  </ConversationContainer>
                );
              })
            ) : (
              <p style={{ textAlign: "center", color: "#9ca3af" }}>
                👋 Hi there! Welcome to Liber. We’re here to help you find the
                right freelancer or service. Let’s get started — what’s your
                name?
                <div style={{ marginTop: gap }}>
                  <div>
                    <StyledInput
                      type="text"
                      value={guestFname}
                      onChange={handleSetguestFname}
                      placeholder="First name"
                    />
                  </div>
                  <div style={{ marginTop: `${gap}px` }}>
                    <StyledInput
                      type="text"
                      value={guestLname}
                      onChange={handleSetguestLname}
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </p>
            )}
          </ChatBody>
          <ChatInputContainer
            onSubmit={message ? handleSubmit : (e) => e.preventDefault()}
          >
            <ChatInput
              type="text"
              value={message}
              onChange={handleSetMessage}
              placeholder="Type your message..."
            />
            <SaveButton
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                padding: 10,
                borderRadius: 10,
              }}
            >
              Send
            </SaveButton>
          </ChatInputContainer>
        </ChatBox>
      )}

      <FloatingButton onClick={() => setIsOpen(!isOpen)} aria-label="Chat">
        <MessageSquare size={24} />
      </FloatingButton>
    </>
  );
};

export default ChatWidget;

const ConversationContainer = styled.div`
  display: grid;
`;

const RowConversationContainer = styled.div`
  margin-top: ${gap}px;
  display: grid;
`;

const Message = styled.div`
  font-family: ${fontFamily.font};
`;

const Name = styled.span`
  color: ${gray};
  font-size: 11px;
  font-family: ${fontFamily.font};
`;

// Styled Components
const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background-color: ${primaryColor};
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${gray};
  }
`;

const ChatBox = styled.div`
  position: fixed;
  bottom: 96px;
  right: 24px;
  width: 320px;
  height: 400px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 999;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 12px 16px;
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${primaryColor};
  display: flex;
  color: ${white};
  gap: ${gap}px;
  justify-content: space-between;
  align-items: center;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  font-size: 14px;
  color: #374151;
`;

const ChatInputContainer = styled.form`
  padding: 12px;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  position: relative;
`;

const ChatInput = styled.input`
  width: 91%;
  padding: 20px 12px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: ${primaryColor};
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
  }
`;
