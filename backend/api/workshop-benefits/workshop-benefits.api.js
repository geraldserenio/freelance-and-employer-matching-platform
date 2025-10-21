const { getWorkshopBenefits } = require("../../controller/workshop-benefits/workshop-benefits.controller.js");
const ResponseService = require("../../services/response.service");

class WorkshopBenefitsApi {
    
    static async getAllWorkShopBenefits(req, res) {
        try {
            const { data, meta } = await getWorkshopBenefits();
            return ResponseService.success(res, data, "Workshop Benefits retrieved successfully", meta);
        } catch (error) {
            return ResponseService.serverError(res, error.message);
        }
    }
}

module.exports = WorkshopBenefitsApi;
