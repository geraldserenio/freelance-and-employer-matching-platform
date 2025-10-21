const { PlatformFeature } = require('../../models');

const getPlatformFeatures = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;

        const totalPlatformFeature = await PlatformFeature.count();

        const platformFeatures = await PlatformFeature.findAll({
            offset: offset,
            limit: limit
        });

        const totalPages = Math.ceil(totalPlatformFeature / limit);

        return {
            data: platformFeatures,
            meta: {
                total: totalPlatformFeature,
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
    getPlatformFeatures,
};