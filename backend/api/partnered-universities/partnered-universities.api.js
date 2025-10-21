
const { query } = require("express");
const ResponseService = require("../../services/response.service");
const { getPartneredUniversities } = require("../../controller/partnered-universities/partnered-univesities.controller");

class PartneredUniversitiesApi {
    
    static async getAllPartneredUniversities(req, res) {
        
        const {page, limit} = req.query

        try {
            const { data, meta } = await getPartneredUniversities(page, limit);
            return ResponseService.success(res, data, "Partnered universities retrieved successfully", meta);
        } catch (error) {
            return ResponseService.serverError(res, error.message);
        }
    }
}

module.exports = PartneredUniversitiesApi;
