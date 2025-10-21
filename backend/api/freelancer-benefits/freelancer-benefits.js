const { getBenefits } = require("../../controller/freelancer-benefits/freelancerBenefits");

const getAllFreelancerBenefits = async (req, res) => {

    const result = await getBenefits("freelancer");

    return res.json({ result })

}

module.exports = {
    getAllFreelancerBenefits
};