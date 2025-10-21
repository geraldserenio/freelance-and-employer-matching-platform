const {
  getAllProjectPaymentsByAdminController,
  updateGigPaymentStatusesController,
} = require("../../controller/project-payment/project-payment-controller");
const { verifyToken } = require("../verifyToken");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SK_LIVE || "");

const transferFundsAPI = async (req, res) => {
  const { id, amount, currency, connectedAccountId } = req.body;
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    if (verifiedToken?.user_type != "admin") {
      return res
        .status(401)
        .json({ message: "Only admin can access this API" });
    }
    try {
      const transfer = await stripe.transfers.create({
        amount,
        currency,
        destination: connectedAccountId,
      });
      console.log("transfer", transfer);
      await updateGigPaymentStatusesController({
        id: id,
        amount: amount,
        transfer_id: transfer?.id,
      });

      res.json({ success: true, transfer });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getAllProjectPaymentsByAdminAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    if (verifiedToken?.user_type != "admin") {
      return res
        .status(401)
        .json({ message: "Only admin can access this API" });
    }

    const page = req.query.page;
    const status = req.query.status;

    const result = await getAllProjectPaymentsByAdminController(status, page);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = {
  getAllProjectPaymentsByAdminAPI,
  transferFundsAPI,
};
