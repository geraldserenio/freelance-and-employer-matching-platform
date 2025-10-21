
const { query } = require("express");
const { getPrograms } = require("../../controller/programs/programs.controller");
const ResponseService = require("../../services/response.service");

class ProgramApi {
    
    static async getAllprograms(req, res) {
        const {page, limit} = req.query

        try {
            const { data, meta } = await getPrograms(page, limit);
            return ResponseService.success(res, data, "Workshop programs retrieved successfully", meta);
        } catch (error) {
            return ResponseService.serverError(res, error.message);
        }
    }
}

module.exports = ProgramApi;
