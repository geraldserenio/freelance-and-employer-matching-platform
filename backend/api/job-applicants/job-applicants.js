const { getAllJobApplicantsByFreelancerIdController, updateApplicantStatusController, checkIfAlreadyApplied } = require("../../controller/job-applicants/jobApplicants");
const { verifyToken } = require("../verifyToken");


const getAllJobApplicantsByFreelancerIdAPI = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
        const id = req.query.user_id;
        const page = req.query.page;
        const status = req.query.status;
        const job_listing_status = req.query.job_listing_status;
        const result = await getAllJobApplicantsByFreelancerIdController(id, status, job_listing_status, page);

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }

}



const checkIfAlreadyAppliedAPI = async (req, res) => {
    // Get token from authorization header
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
        const { user_id, jobId } = req.body;

        const result = await checkIfAlreadyApplied(user_id, jobId)

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

const updateApplicantStatusAPI = async (req, res) => {
    // Get token from authorization header
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
        const { id, status } = req.body;

        const result = await updateApplicantStatusController(id, status)

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

module.exports = {
    getAllJobApplicantsByFreelancerIdAPI,
    updateApplicantStatusAPI,
    checkIfAlreadyAppliedAPI
};