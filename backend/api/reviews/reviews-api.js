const { getRecommendedProject } = require("../../controller/reviews/reviews");
const { verifyToken } = require("../verifyToken");

const getRecommendedProjectAPI = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const user_id = req.query.user_id;

    const result = await getRecommendedProject(user_id);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = {
  getRecommendedProjectAPI,
};
