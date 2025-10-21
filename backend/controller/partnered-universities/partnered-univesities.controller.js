const { PartneredUniversity } = require('../../models');

const getPartneredUniversities = async (page = 1, limit = 10) => {

    const offset = (page - 1) * limit;

    try {
        const totalPartneredUniversities = await PartneredUniversity.count();

        const partneredUniversities= await  PartneredUniversity.findAll({
            offset: offset,
            limit: limit
        });


        const totalPages = Math.ceil(totalPartneredUniversities / limit);
        
        return {
            data: partneredUniversities,
            meta: {
                total: getPartneredUniversities,
                totalPages,
                currentPage: page,
                perPage: limit,
            },
        };
    } catch (error) {
        console.error("Server error:", error);
        throw new Error("Failed to fetch Partnered University"); 
    }
};

module.exports = {
    getPartneredUniversities,
};
