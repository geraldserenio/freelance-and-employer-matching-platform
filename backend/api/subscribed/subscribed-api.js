const { getSubscribed } = require("../../controller/subscribed/subscribed");
const {
  getSubscriptions,
} = require("../../controller/subscriptions/subscriptions");
const { verifyToken } = require("../verifyToken");

const getAllSubscribedAPI = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const result = await getSubscribed();

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = {
  getAllSubscribedAPI,
};
