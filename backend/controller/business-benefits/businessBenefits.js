const { FreelancerBenefits } = require('../../models');

const getBusinessBenefits = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;

        const totalFreelancerBenefits = await FreelancerBenefits.count();

        const freelancerBenefits = await FreelancerBenefits.findAll({
            offset: offset,
            limit: limit
        });

        const totalPages = Math.ceil(totalFreelancerBenefits / limit);

        return {
            data: freelancerBenefits,
            meta: {
                total: totalFreelancerBenefits,
                totalPages,
                currentPage: page,
                perPage: limit,
            },
        };
    } catch (error) {
        console.error("Server error:", error);
        return error;
    }
}

module.exports = {
    getBusinessBenefits,
};