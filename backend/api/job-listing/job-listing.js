const { getJobListings, storeApplicantsController, storeJobListingController, deleteJoblistingController, getJoblistingByIdController, getAllJoblistingByBusinessIdController } = require("../../controller/job-listing/jobListing");
const { verifyToken } = require("../verifyToken");

const getAllOrByIdJobListings = async (req, res) => {
    const id = req.query.id;
    const status = req.query.status;
    const page = req.query.page;
    const filters = req.query.filters !== "undefined" && req.query.filters !== "null" ? JSON.parse(decodeURIComponent(req.query.filters)) : {};
    const result = await getJobListings(id === "null" ? null : id, status, page, filters);

    return res.json({ result })
}

const getJobListingByFilter = async (req, res) => {
    const page = req.query.page;
    const result = await getJobListings(null, "open", page, req.body);

    return res.json({ result })
}

const storeApplicants = async (req, res) => {
    // Get token from authorization header
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const { applicant_id, job_listing_id } = req.body
        const result = await storeApplicantsController(req.file.filename, applicant_id, job_listing_id)

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

const storeJobListing = async (req, res) => {
    // Get token from authorization header
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {

        const { project_id, created_by, qualification, responsibilities, location, contract_type, experience_level, salary, job_title } = req.body
        if (!project_id || !created_by || !qualification || !responsibilities || !location || !contract_type || !experience_level || !salary || !job_title) {
            return res.status(400).json({ message: 'Missing fields!' });
        }

        const result = await storeJobListingController(req.body)

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

const getJobListingByIdAPI = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
        const { id } = req.params;
        const result = await getJoblistingByIdController(id)

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

const getAllJobListingByBusinessAPI = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
       
        const id = req.query.user_id;
        const page = req.query.page;
        const status = req.query.status;
        const result = await getAllJoblistingByBusinessIdController(id, status, page)

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

const deleteJobListingAPI = async (req, res) => {
    // Get token from authorization header
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
        const { id } = req.params;

        const result = await deleteJoblistingController(id)

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

module.exports = {
    getAllOrByIdJobListings,
    getJobListingByFilter,
    storeApplicants,
    storeJobListing,
    deleteJobListingAPI,
    getJobListingByIdAPI,
    getAllJobListingByBusinessAPI
};