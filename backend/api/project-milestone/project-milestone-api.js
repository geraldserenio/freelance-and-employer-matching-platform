const {
  getAllProjectMilestoneByUserIdController,
  getAllProjectMilestoneByProjectGigIdController,
  storeMilestoneController,
  getSpecificProjectMilestoneByIdController,
  getNeedsRevisionProjectMilestoneByIdController,
  updateStatusToNeedsReivisionController,
  getPendingProjectMilestoneByIdController,
  getAlreadySubmittedMilestoneFreelancerController,
  getSpecificProjectMilestoneByActualIdController,
} = require("../../controller/project-milestone/project-milestone-controller");
const { verifyToken } = require("../verifyToken");

const storeMilestoneAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    req.body.user_id = verifiedToken?.userId;

    const result = await storeMilestoneController(req.file, req.body);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

//for freelancer
const getAllProjectMilestoneByUserIdAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const page = req.query.page;
    const status = req.query.status;

    const result = await getAllProjectMilestoneByUserIdController(
      verifiedToken?.userId,
      status,
      page
    );

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

//for client
const getAllProjectMilestoneByProjectGigIdAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { project_gig_id } = req.params;

    const result = await getAllProjectMilestoneByProjectGigIdController(
      project_gig_id
    );

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getSpecificProjectMilestoneByActualIdAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { id } = req.params;

    const result = await getSpecificProjectMilestoneByActualIdController(id);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getSpecificProjectMilestoneByIdAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { id } = req.params;

    const result = await getSpecificProjectMilestoneByIdController(id);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getNeedsRevisionProjectMilestoneByIdAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const result = await getNeedsRevisionProjectMilestoneByIdController(
      verifiedToken?.userId
    );

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getPendingProjectMilestoneByIdAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const result = await getPendingProjectMilestoneByIdController(
      verifiedToken?.userId
    );

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};
const getAlreadySubmittedMilestoneFreelancerAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const project_applicants_id = req.query.project_applicants_id;
    const result = await getAlreadySubmittedMilestoneFreelancerController(
      project_applicants_id
    );

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const updateStatusToNeedsReivisionAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { id, newRemarks } = req.body;

    const result = await updateStatusToNeedsReivisionController(id, newRemarks);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = {
  getAllProjectMilestoneByUserIdAPI,
  getAllProjectMilestoneByProjectGigIdAPI,
  storeMilestoneAPI,
  getSpecificProjectMilestoneByIdAPI,
  getNeedsRevisionProjectMilestoneByIdAPI,
  updateStatusToNeedsReivisionAPI,
  getPendingProjectMilestoneByIdAPI,
  getAlreadySubmittedMilestoneFreelancerAPI,
  getSpecificProjectMilestoneByActualIdAPI,
};
