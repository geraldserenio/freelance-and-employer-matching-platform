const { Program } = require('../../models');

const getPrograms = async (page = 1, limit = 10) => {

    const offset = (page - 1) * limit;

    try {
        const totalPrograms = await Program.count();

        const programs= await Program.findAll({
            offset: offset,
            limit: limit
        });

        const totalPages = Math.ceil(totalPrograms / limit);
        
        return {
            data: programs,
            meta: {
                total: totalPrograms,
                totalPages,
                currentPage: page,
                perPage: limit,
            },
        };
    } catch (error) {
        console.error("Server error:", error);
        throw new Error("Failed to fetch programs"); 
    }
};

module.exports = {
    getPrograms,
};
