const {
  enableEdisableUser,
  getUserById,
  updateUserById,
  verifyUser,
  browseFreelancers,
  storeSubscription,
} = require("../../controller/user-management/userController");
const { verifyToken } = require("../verifyToken");

const enableDisableUser = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const user_type = verifiedToken?.user_type;
    if (user_type !== "admin") {
      return res
        .status(401)
        .json({ message: "Only admin can access this API" });
    }

    const { is_active, id } = req.body;
    const result = await enableEdisableUser(is_active, id);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getUserByIdAPI = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { id } = req.params;
    const result = await getUserById(id);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const updateStoreSubscriptionAndUpdateStepAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    req.body.userId = verifiedToken?.userId;
    const result = await storeSubscription(req.body);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const updateProfileAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const {
      first_name,
      middle_name,
      last_name,
      mobile,
      email,
      about,
      new_password,
      confirm_password,
    } = req.body;

    if (!first_name || !last_name || !mobile || !email) {
      return res.status(400).json({
        title: "Missing Fields!",
        message:
          "First name, Middle name, Last name, mobile, email are required",
      });
    }

    if (new_password || confirm_password) {
      if (new_password !== confirm_password) {
        return res.status(400).json({
          title: "Mismatch!",
          message: "New password and confirm password mismatch!",
        });
      }

      if (new_password.length < 8) {
        return res.status(400).json({
          title: "Password characters",
          message: "Password must be at least 8 characters",
        });
      }
    }

    const result = await updateUserById(req.file, req.body);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const browseFreelancerAPI = async (req, res) => {
  const page = req.query.page;
  const filters =
    req.query.filters &&
    req.query.filters !== "undefined" &&
    req.query.filters !== "null"
      ? JSON.parse(decodeURIComponent(req.query.filters))
      : {};
  const result = await browseFreelancers(filters, page);

  return res.json({ result });
};

const verifyUserAPI = async (req, res) => {
  const token = req.query.token; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "Link expired!" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const id = req.query.id;
    const result = await verifyUser(id);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "Link expired!" });
  }
};

module.exports = {
  enableDisableUser,
  getUserByIdAPI,
  updateProfileAPI,
  verifyUserAPI,
  browseFreelancerAPI,
  updateStoreSubscriptionAndUpdateStepAPI,
};
