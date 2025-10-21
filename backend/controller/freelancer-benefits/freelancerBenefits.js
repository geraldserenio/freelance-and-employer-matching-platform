const { Benefits } = require('../../models');

const getBenefits = async (user_type, page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;

        const totalFreelancerBenefits = await Benefits.count();

        const freelancerBenefits = await Benefits.findAll({
            where: { user_type },
            offset: offset,
            limit: limit,
            order: [['id', 'ASC']]
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
    getBenefits,
};