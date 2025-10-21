const { User, PremiumFreelancers } = require('../../models');
const getPreimumFreelancers = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;

        const totalPremiumFreelancers = await PremiumFreelancers.count();

        const premiumFreelancers = await PremiumFreelancers.findAll({
            offset: offset,
            limit: limit, include: [{
                model: User,
                as: 'users'
            }]
        });

        const totalPages = Math.ceil(totalPremiumFreelancers / limit);

        return {
            data: premiumFreelancers,
            meta: {
                total: totalPremiumFreelancers,
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
    getPreimumFreelancers,
};