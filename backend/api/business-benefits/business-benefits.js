const { getBenefits } = require("../../controller/freelancer-benefits/freelancerBenefits");

const getAllBusinessBenefits = async (req, res) => {

    const result = await getBenefits("business");

    return res.json({ result })

}

module.exports = {
    getAllBusinessBenefits
};