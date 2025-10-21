const { MultipleOpportunities } = require('../../models');

const getMultipleOpportunities = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;

        const totalMultipleOpportunities = await MultipleOpportunities.count();

        const multipleOpportunities = await MultipleOpportunities.findAll({
            offset: offset,
            limit: limit
        });

        const totalPages = Math.ceil(totalMultipleOpportunities / limit);

        return {
            data: multipleOpportunities,
            meta: {
                total: totalMultipleOpportunities,
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
    getMultipleOpportunities,
};