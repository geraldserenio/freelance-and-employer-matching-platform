const { getMultipleOpportunities } = require("../../controller/multiple-opportunities/multipleOpportunities");

const getAllMultipleOpportunities = async (req, res) => {

    const result = await getMultipleOpportunities();

    return res.json({ result })

}

module.exports = {
    getAllMultipleOpportunities
};