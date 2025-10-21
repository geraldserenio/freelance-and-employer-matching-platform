import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { gap } from "../../shared/styles/sizes";
import {
  gray,
  panelBackground,
  primaryColor,
  white,
} from "../../shared/styles/color";
import { Heading, TagLabel } from "../projects/ProjectInfo";
import { StyledInput } from "../../shared/inputs/LoginField";
import { SaveButton } from "../projects/AddProject";
import { useLocation } from "react-router-dom";
import {
  getConversation,
  getConversationListService,
  sendMessage,
  unsendMessage,
} from "../../../services/messages/messages-service";
import { ListOfConversation } from "./ListOfConversation";
import { FreelancerHeader } from "../../navigation/page-header/FreelancerHeader";
import { BusinessHeader } from "../../navigation/page-header/BusinessHeader";
import HamburgerMenu from "./HamburgerMenu";
import Swal from "sweetalert2";
import Modal from "../../shared/modal/Modal";
import { EditMessageForm } from "./EditMessageForm";
import { generateIcon, Icon } from "../../shared/icons/generate-icon";
import { useRef } from "react";
import { BASE_URL } from "../../../helper/base-url";

export const Messages = () => {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [page, setPage] = useState(1);
  const [fetchFlag, setFetchFlag] = useState();
  const [conversation, setConversation] = useState([]);
  const [conversationList, setConversationList] = useState([]);
  const [conversationMeta, setConversationMeta] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [hovered, setHovered] = useState(null);
  const [isEditMessageModalOpen, setIsEditMessageModalOpen] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const toggleEditMessageModal = () =>
    setIsEditMessageModalOpen(!isEditMessageModalOpen);

  const role = userData?.user?.user_type;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (messageId) {
      formData.append("id", messageId);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("recipient", recipient?.id);
    formData.append("sender", loggedInUser?.user?.id);
    formData.append("message", message);
    await sendMessage(formData);
    setFetchFlag(!fetchFlag);
    setMessage("");
    setMessageId(null);
    setImageFile(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };
  const [recipient, setRecipient] = useState({
    id: location.state?.recipientId,
    fullname: location.state?.fullname,
    photo: location.state?.photo,
  });

  const handleSetRecipient = useCallback((data) => setRecipient(data), []);

  useEffect(() => {
    async function fetchConversation() {
      const result = await getConversation(
        recipient?.id,
        loggedInUser?.user?.id,
        page,
      );

      setConversation(result?.data?.result?.data);

      setConversationMeta(result?.data?.result?.meta);
    }

    async function getConversationList() {
      const result = await getConversationListService(
        loggedInUser?.user?.id,
        1,
      );

      const messages = result.data?.result?.data;

      // Group by senderId.id, but keep only the latest message
      const latestPerSender = {};

      messages?.forEach((msg) => {
        const senderId = msg.senderId.id;

        if (!latestPerSender[senderId]) {
          latestPerSender[senderId] = msg;
        } else {
          const currentLatest = new Date(latestPerSender[senderId].created_at);
          const thisMsgDate = new Date(msg.created_at);
          if (thisMsgDate > currentLatest) {
            latestPerSender[senderId] = msg;
          }
        }
      });

      // Convert to array of latest messages
      const finalMessages = Object.values(latestPerSender);

      setConversationList(finalMessages);
    }

    if (recipient?.id) {
      fetchConversation();
    }
    getConversationList();
  }, [recipient?.id, page, fetchFlag]);

  useEffect(() => {
    async function fetchConversation() {
      const result = await getConversation(
        recipient?.id,
        loggedInUser?.user?.id,
        page,
      );

      setPage(
        result?.data?.result?.meta?.totalPages == 0
          ? 1
          : result?.data?.result?.meta?.totalPages,
      );
    }
    if (recipient?.id) {
      fetchConversation();
    }
  }, []);

  const handleDeleteMessage = (messageId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting message, will be deleted forever",
      icon: "warning",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await unsendMessage(messageId);
        setFetchFlag(!fetchFlag);
      }
    });
  };

  const handleEditMessage = (messageId, message) => {
    setMessage(message);
    setMessageId(messageId);
  };

  const handleCancelEditing = () => {
    setMessageId(null);
    setMessage("");
  };

  const ShortFileDisplay = (filename) => {
    if (!filename) return null;

    const ext = filename.slice(filename?.lastIndexOf("."));
    const shortCode = filename.slice(0, 1) + ".." + filename.slice(1, 2) + ext;

    return shortCode;
  };

  return (
    <div>
      {role === "freelancers" ? <FreelancerHeader /> : <BusinessHeader />}
      <Modal
        isOpen={isEditMessageModalOpen}
        onClose={toggleEditMessageModal}
        title="Edit Message"
      >
        <EditMessageForm />
      </Modal>
      <Container>
        <Heading
          style={{
            marginTop: 0,
            marginBottom: 0,
            textAlign: "left",
            color: primaryColor,
          }}
        >
          Messages
        </Heading>
        <MainContainer>
          <ListOfContacts>
            {conversationList?.map((data, index) => (
              <ListOfConversation
                {...data}
                key={index}
                handleSetRecipient={handleSetRecipient}
              />
            ))}
          </ListOfContacts>
          <Messaging>
            <div>
              {recipient?.id && (
                <RecipientContainer>
                  {/* <Icon
                    src={
                      recipient?.photo
                        ? `${BASE_URL}uploads/${recipient?.photo}`
                        : generateIcon("Empty")
                    }
                    style={{
                      borderRadius: "28px",
                      height: "40px",
                      width: "40px",
                    }}
                  />{" "} */}
                  <TagLabel>{recipient?.fullname}</TagLabel>
                </RecipientContainer>
              )}
            </div>
            {page > 1 && (
              <LoadButton
                disabled={
                  conversation?.length < conversationMeta?.total ? false : true
                }
                onClick={() => {
                  setPage((prevPage) => prevPage - 1);
                  setFetchFlag(!fetchFlag);
                }}
                style={{
                  opacity:
                    conversation?.length < conversationMeta?.total ? 1 : 0.5,
                  cursor:
                    conversation?.length < conversationMeta?.total
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                Load oldest
              </LoadButton>
            )}
            <MessagesBoxContainer>
              {conversation?.map((data, index) => {
                return data?.recipient === loggedInUser?.user?.id ? (
                  <MessageRowContainer
                    style={{ justifyContent: "flex-start" }}
                    key={index}
                  >
                    <MessageContianer>
                      <IconAndName>
                        {/* <Icon
                          src={
                            data?.senderId?.photo
                              ? `${BASE_URL}uploads/${data?.senderId?.photo}`
                              : generateIcon("Empty")
                          }
                          style={{
                            borderRadius: "28px",
                            height: "25px",
                            width: "25px",
                            margin: "auto",
                          }}
                        /> */}
                        <NameMessageRow>{`${data?.senderId?.first_name}`}</NameMessageRow>
                      </IconAndName>
                      <TagLabel style={{ fontSize: "13px" }}>
                        {data?.message}
                      </TagLabel>
                    </MessageContianer>
                  </MessageRowContainer>
                ) : (
                  <MessageRowContainer
                    style={{ justifyContent: "flex-end" }}
                    key={index}
                    onMouseEnter={() => setHovered(data?.id)}
                    onMouseLeave={() => {
                      setHovered(null);
                    }}
                  >
                    {hovered == data?.id && (
                      <HamburgerMenu
                        onUnsend={() => handleDeleteMessage(data?.id)}
                        onEdit={() =>
                          handleEditMessage(data?.id, data?.message)
                        }
                      />
                    )}
                    <MessageContianer style={{ backgroundColor: primaryColor }}>
                      <div>
                        <TagLabel
                          style={{
                            fontSize: "13px",
                            color: white,
                            display: "block",
                          }}
                        >
                          {data?.message}
                        </TagLabel>
                        {data?.attachment && (
                          <Icon
                            style={{ height: "150px", width: "150px" }}
                            src={`${BASE_URL}uploads/${data?.attachment}`}
                          />
                        )}
                      </div>

                      <IconAndName>
                        {/* <Icon
                          src={
                            data?.senderId?.photo
                              ? `${BASE_URL}uploads/${data?.senderId?.photo}`
                              : generateIcon("Empty")
                          }
                          style={{
                            borderRadius: "28px",
                            height: "25px",
                            width: "25px",
                            margin: "auto",
                          }}
                        /> */}
                        <NameMessageRow
                          style={{ color: white }}
                        >{`You`}</NameMessageRow>
                      </IconAndName>
                    </MessageContianer>
                  </MessageRowContainer>
                );
              })}
            </MessagesBoxContainer>
            {page < conversationMeta?.totalPages && (
              <LoadButton
                disabled={
                  conversation?.length < conversationMeta?.total ? false : true
                }
                onClick={() => {
                  setPage((prevPage) => prevPage + 1);
                  setFetchFlag(!fetchFlag);
                }}
                style={{
                  opacity:
                    conversation?.length < conversationMeta?.total ? 1 : 0.5,
                  cursor:
                    conversation?.length < conversationMeta?.total
                      ? "pointer"
                      : "not-allowed",
                }}
              >
                Load newest
              </LoadButton>
            )}
            {messageId && (
              <EditMessageIndicationContainer>
                <div>Edit message</div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={handleCancelEditing}
                >
                  &times;
                </div>
              </EditMessageIndicationContainer>
            )}
            <ComposeFieldContainer
              onSubmit={
                message != "" ? handleSendMessage : (e) => e.preventDefault()
              }
            >
              <StyledInput value={message} onChange={handleChangeMessage} />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <div>
                <Icon
                  style={{ width: "50px", height: "50px", cursor: "pointer" }}
                  src={generateIcon("AttachImage")}
                  onClick={handleClick}
                />
                {ShortFileDisplay(imageFile?.name)}{" "}
              </div>

              <SaveButton
                style={{
                  borderRadius: "12px",
                  opacity: message != "" ? 1 : 0.5,
                  cursor: message != "" ? "pointer" : "not-allowed",
                }}
                type="submit"
              >
                {messageId ? "Edit" : "Send"}
              </SaveButton>
            </ComposeFieldContainer>
          </Messaging>
          {/* <Settings>Settings</Settings> */}
        </MainContainer>
      </Container>
    </div>
  );
};

const EditMessageIndicationContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MessageContianer = styled.div`
  display: flex;
  gap: ${gap}px;
  border: 1px solid ${gray};
  padding: ${gap}px;
  border-radius: ${gap}px;
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: ${panelBackground};
`;

const IconAndName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const NameMessageRow = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 10px;
  color: #666;
  text-align: center;
`;

const MessageRowContainer = styled.div`
  display: flex;
  gap: ${gap}px;
  margin-top: ${gap}px;
  align-items: center;
`;

const RecipientContainer = styled.div`
  flex: 0.2;
  text-align: left;
  display: flex;
  gap: ${gap}px;
  padding-bottom: ${gap}px;
`;

const MessagesBoxContainer = styled.div`
  flex: 3.3;
  border-radius: ${gap}px;
  text-align: left;
  margin-top: ${gap}px;
  height: 90px;
  overflow: auto;
`;

const ComposeFieldContainer = styled.form`
  flex: 0.3;
  display: flex;
  gap: ${gap}px;
  margin-top: ${gap}px;
  align-items: center;
`;

const Container = styled.div`
  padding: ${gap}px;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${gap * 3}px;
  gap: ${gap}px;
`;

const ListOfContacts = styled.div`
  border: 1px solid ${gray};
  width: 20%;
  border-radius: ${gap}px;
  height: 65vh;
  padding: ${gap}px;
  display: flex;
  flex-direction: column;
  gap: ${gap - 5}px;
`;

const Messaging = styled.div`
  border: 1px solid ${gray};
  width: 60%;
  border-radius: ${gap}px;
  height: 65vh;
  padding: ${gap}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
`;

const Settings = styled.div`
  border: 1px solid ${gray};
  width: 20%;
  border-radius: ${gap}px;
  height: 65vh;
  padding: ${gap}px;
`;

const LoadButton = styled.div`
  color: ${primaryColor};
  margin-top: ${gap}px;
  text-decoration: underline;
`;
