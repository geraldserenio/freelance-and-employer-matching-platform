const { getHowItWorksByUserType } = require("../../controller/how-it-works/howItWorks");

const getAllHowItWorksByUserType = async (req, res) => {
    const user_type = req.query.user_type;
    const result = await getHowItWorksByUserType(user_type);

    return res.json({ result })

}

module.exports = {
    getAllHowItWorksByUserType
};