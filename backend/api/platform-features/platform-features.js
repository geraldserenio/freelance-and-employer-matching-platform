const { getPlatformFeatures } = require("../../controller/platform-features/platformFeatures");

const getAllPlatformFeatures = async (req, res) => {

    const platform_features = await getPlatformFeatures();

    return res.json({ platform_features })

}

module.exports = {
    getAllPlatformFeatures
};