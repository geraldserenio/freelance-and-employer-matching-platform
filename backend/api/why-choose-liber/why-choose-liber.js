const { getWhyChooseLiberByUserType } = require("../../controller/why-choose-liber/why-choose-liber");


const getAllWhyChooseLiberByUserType = async (req, res) => {
    const { user_type } = req.params;
    const result = await getWhyChooseLiberByUserType(user_type);

    return res.json({ result })

}

module.exports = {
    getAllWhyChooseLiberByUserType
};