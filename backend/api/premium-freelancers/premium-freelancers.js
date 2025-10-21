const { getPreimumFreelancers } = require("../../controller/premium-freelancers/premium-freelancers");

const getAllPremiumFreelancers = async (req, res) => {

    const result = await getPreimumFreelancers();

    return res.json({ result })

}

module.exports = {
    getAllPremiumFreelancers
};