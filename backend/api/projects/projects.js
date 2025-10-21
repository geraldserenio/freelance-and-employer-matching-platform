const {
  getAllProjectsByBusinessId,
  storeProject,
  getProjectById,
  deleteProject,
  getAllProjectsByBusinessIdForDropdown,
  browseProjects,
  storeReview,
  getProjectByDeadline,
} = require("../../controller/projects/projects");
const { verifyToken } = require("../verifyToken");

const getAllProjectsByBusiness = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const id = req.query.user_id;
    const page = req.query.page;
    const result = await getAllProjectsByBusinessId(id, null, page);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const browseProjectAPI = async (req, res) => {
  const page = req.query.page;
  const filters =
    req.query.filters &&
    req.query.filters !== "undefined" &&
    req.query.filters !== "null"
      ? JSON.parse(decodeURIComponent(req.query.filters))
      : {};
  const result = await browseProjects(filters, page);

  return res.json({ result });
};

const projectReviewAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { stars, review } = req.body;

    if (!stars || !review) {
      return res
        .status(400)
        .json({ message: "Rating and Review are required" });
    }

    const result = await storeReview(req.body);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getAllProjectsByBusinessForDropdownAPI = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const id = req.query.user_id;
    const status = req.query.status;
    const result = await getAllProjectsByBusinessIdForDropdown(id, status);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getProjectByIdAPI = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { id } = req.params;
    const result = await getProjectById(id);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getProjectByDeadlineAPI = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { deadline } = req.params;
    const result = await getProjectByDeadline(deadline, verifiedToken?.userId);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const storeProjectAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { project_name, project_description } = req.body;

    if (!project_name || !project_description) {
      return res
        .status(400)
        .json({ message: "Project name and Project description are required" });
    }
    req.body.business = verifiedToken?.userId;
    const result = await storeProject(req.body);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const deleteProjectAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { id } = req.body;

    const result = await deleteProject(id);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = {
  getAllProjectsByBusiness,
  storeProjectAPI,
  getProjectByIdAPI,
  deleteProjectAPI,
  getAllProjectsByBusinessForDropdownAPI,
  browseProjectAPI,
  projectReviewAPI,
  getProjectByDeadlineAPI,
};
