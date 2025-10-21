const { JobApplicant, Project, User, JobListing } = require('../../models');

const getAllJobApplicantsByFreelancerIdController = async (userId, status, job_listing_status = "open", page = 1, limit = 10) => {
    try {
        try {
            const offset = (page - 1) * limit;

            const total = await JobApplicant.count({
                where: status ? { applicant_id: userId, status: status, is_active: true } : { applicant_id: userId, is_active: true },
                include: [{
                    model: JobListing,
                    as: 'job_listings_for_freelancer',
                    required: true,
                    where: { status: job_listing_status },
                }
                ]
            });

            const list = await JobApplicant.findAll({
                offset: offset,
                limit: limit,
                where: status ? { applicant_id: userId, status: status, is_active: true } : { applicant_id: userId, is_active: true },
                include: [{
                    model: JobListing,
                    as: 'job_listings_for_freelancer',
                    required: true,
                    where: { status: job_listing_status },
                    include: [{
                        model: Project,
                        as: 'project',
                        required: false,
                    },
                    {
                        model: User,
                        as: 'users',
                        required: true,
                    }]
                }
                ]
            });

            const totalPages = Math.ceil(total / limit);

            return {
                data: list,
                meta: {
                    total: total,
                    totalPages,
                    currentPage: page,
                    perPage: limit,
                },
            };
        } catch (error) {
            console.error("Server error:", error);
            return error;
        }
    } catch (error) {
        console.error("Server error:", error);
        return error;
    }
}


const checkIfAlreadyApplied = async (user_id, job_listing_id) => {
    try {

        const total = await JobApplicant.count({ where: { job_listing_id: job_listing_id, applicant_id: user_id, is_active: true } });


        return {
            data: total,
        };
    } catch (error) {
        console.error("Server error:", error);
        return error;
    }
}

const updateApplicantStatusController = async (id, status) => {

    try {
        const result =
            await JobApplicant.update({
                status: status
            }, { where: { id: id } })

        if (!result) {
            return false;
        }

        return result;
    } catch (error) {
        console.error("Error saving file to database:", error);
        res.status(500).json({ error: "Database error" });
    }
}
module.exports = {
    getAllJobApplicantsByFreelancerIdController,
    updateApplicantStatusController,
    checkIfAlreadyApplied
};