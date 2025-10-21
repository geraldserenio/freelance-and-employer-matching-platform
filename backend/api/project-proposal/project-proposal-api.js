const {
  storeProjectProposal,
  getAllProjectProposalByBusinessIdController,
  getSpecificProjectProposalByIdController,
  AcceptOrAcceptGIGProposalController,
  getAllProjectProposalByApplicantIdController,
  getAllAlreadyProposedFreelancerController,
} = require("../../controller/project-proposal/project-proposal-controller");
const { verifyToken } = require("../verifyToken");

const storeProjectProposalAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    req.body.applicant_id = verifiedToken?.userId;

    const result = await storeProjectProposal(req.body);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getAlreadyProposedFreelancerAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const project_id = req.query.project_id;
    const result = await getAllAlreadyProposedFreelancerController(
      verifiedToken?.userId,
      project_id
    );

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

//for freelancer
const getAllProjectProposalByApplicantIdAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const page = req.query.page;
    const status = req.query.status;
    const result = await getAllProjectProposalByApplicantIdController(
      verifiedToken?.userId,
      status,
      page
    );

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getAllProjectProposalByBusinessIdAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const page = req.query.page;
    const status = req.query.status;

    const result = await getAllProjectProposalByBusinessIdController(
      verifiedToken?.userId,
      status,
      page
    );

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getSpecificProjectProposalByIdAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { id } = req.params;

    const result = await getSpecificProjectProposalByIdController(id);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const acceptOrAcceptGIGProposalAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { id, status } = req.body;

    const result = await AcceptOrAcceptGIGProposalController(id, status);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = {
  getAllProjectProposalByBusinessIdAPI,
  storeProjectProposalAPI,
  getSpecificProjectProposalByIdAPI,
  acceptOrAcceptGIGProposalAPI,
  getAllProjectProposalByApplicantIdAPI,
  getAlreadyProposedFreelancerAPI,
};
