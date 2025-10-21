const { WhyChooseLiber } = require('../../models');

const getWhyChooseLiberByUserType = async (user_type, page = 1, limit = 3) => {
    try {
        const offset = (page - 1) * limit;

        const totalWhyChooseLiber = await WhyChooseLiber.count();

        const whyChooseLiber = await WhyChooseLiber.findAll({
            offset: offset,
            limit: limit,
            where: { user_type }
        });

        const totalPages = Math.ceil(totalWhyChooseLiber / limit);

        return {
            data: whyChooseLiber,
            meta: {
                total: totalWhyChooseLiber,
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
    getWhyChooseLiberByUserType
};