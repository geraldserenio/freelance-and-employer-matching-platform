const { WorkshopBenefit } = require('../../models');

const getWorkshopBenefits = async () => {
    try {
        const totalWorkshopBenefits = await WorkshopBenefit.count();
        const workshopBenefits = await WorkshopBenefit.findAll();

        return {
            data: workshopBenefits,
            meta: {
                total: totalWorkshopBenefits,
            },
        };
    } catch (error) {
        console.error("Server error:", error);
        throw new Error("Failed to fetch workshop benefits"); 
    }
};

module.exports = {
    getWorkshopBenefits,
};
