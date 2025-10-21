const {
  getAllCoursesController,
  storeCoursesController,
  getCourseByIdController,
  deleteCourseController,
  updatePublishStatusByIdController,
  getAllCoursesByCategortController,
} = require("../../controller/courses/courses-controller");
const { verifyToken } = require("../verifyToken");

const getAllCoursesAPI = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const page = req.query.page;
    const result = await getAllCoursesController(
      verifiedToken?.user_type,
      verifiedToken?.userId,
      page
    );

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const storeCoursesAPI = async (req, res) => {
  // Get token from authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { title, content, status } = req.body;

    if (!title || !content || !status) {
      return res
        .status(400)
        .json({ message: "title, content and status are required" });
    }

    req.body.user_id = verifiedToken?.userId;
    req.body.user_type = verifiedToken?.user_type;

    const result = await storeCoursesController(req.body);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getCourseByIdAPI = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { id } = req.params;
    const result = await getCourseByIdController(id);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const getAllCoursesByCategortAPI = async (req, res) => {
  const page = req.query.page;
  const category = req.query.category;
  const result = await getAllCoursesByCategortController(category, page);

  return res.json({ result });
};

const deleteCourseByIdAPI = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { id } = req.body;
    const result = await deleteCourseController(id);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

const updatePublishStatusByIdAPI = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const verifiedToken = await verifyToken(token);

  if (verifiedToken) {
    const { id, status } = req.body;
    const result = await updatePublishStatusByIdController(id, status);

    return res.json({ result });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = {
  getAllCoursesAPI,
  storeCoursesAPI,
  getCourseByIdAPI,
  deleteCourseByIdAPI,
  updatePublishStatusByIdAPI,
  getAllCoursesByCategortAPI,
};
