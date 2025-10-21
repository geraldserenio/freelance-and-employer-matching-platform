const {
  getSubscriptions,
} = require("../../controller/subscriptions/subscriptions");
const { verifyToken } = require("../verifyToken");

const getAllSubscriptions = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  const verifiedToken = await verifyToken(token);

  const type = req.query.type;
  const result = await getSubscriptions(
    verifiedToken ? verifiedToken?.user_type : null,
    type
  );

  return res.json({ result });
};

module.exports = {
  getAllSubscriptions,
};
