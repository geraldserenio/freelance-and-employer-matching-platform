const { HowItWorks } = require('../../models');

const getHowItWorksByUserType = async (user_type, page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;

        const totalHowItWorks = await HowItWorks.count();

        const howItWorks = await HowItWorks.findAll({
            offset: offset,
            limit: limit,
            where: { user_type },
        });

        const totalPages = Math.ceil(totalHowItWorks / limit);

        return {
            data: howItWorks,
            meta: {
                total: totalHowItWorks,
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
    getHowItWorksByUserType,
};