const {
  getConversationController,
  getConversationListController,
  sendMessage,
  unsendMessageController,
  sendGuestMessageController,
  getGuestConversationController,
} = require("../../controller/messages/messages-controller");

const { verifyToken } = require("../verifyToken");

const getConversationAPI = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const recipient = req.query.recipient;
    const sender = req.query.sender;
    const page = req.query.page;
    const result = await getConversationController(
      recipient,
      sender,
      null,
      page
    );

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getGuestConversationAPI = async (req, res) => {
  const sender = req.query.sender;
  const result = await getGuestConversationController(sender);

  return res.json({ result });
};

const getConversationListAPI = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const recipient = req.query.recipient;
    const page = req.query.page;
    const result = await getConversationListController(recipient, null, page);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const sendMessageAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const result = await sendMessage(req.file, req.body);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const sendGuestMessageAPI = async (req, res) => {
  const result = await sendGuestMessageController(req.body);

  return res.json({ result });
};

const unsendMessageAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { id } = req.body;

    const result = await unsendMessageController(id);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = {
  getConversationAPI,
  getConversationListAPI,
  sendMessageAPI,
  unsendMessageAPI,
  sendGuestMessageAPI,
  getGuestConversationAPI,
};
