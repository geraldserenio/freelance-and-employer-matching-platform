// const { getWorkshopBenefits } = require("../../controller/workshop-benefits/workshop-benefits.controller.js");
const ProjectsController = require("../../controller/projects/projects.controller");
const ResponseService = require("../../services/response.service");

class ProjectsApi {
    
    static async getRecommendedProject(req, res) {
        try {
            const { data } = await ProjectsController.getRecommended();

            return ResponseService.success(res, data, "Retrieved Recommended project");
        } catch (error) {
            console.log(error.message)
            return ResponseService.serverError(res);
        }
    }

    static async getProjectStats(req, res) {
        try {
            const { user_id } = req.query
            const { data } = await ProjectsController.getFreelancerProjectStats(user_id)
            
            return ResponseService.success(res, data, "Retrieved Recommended project");

        } catch (error) {
            console.log(error.message)
            return ResponseService.serverError(res);
        }
    }

    static async getActiveProjects(req, res) {
        try {
            const { user_id } = req.query
            const { data } = await ProjectsController.getFreelancerActiveProjects(user_id)
            
            return ResponseService.success(res, data, "Retrieved active projects");

        } catch (error) {
            console.log(error.message)
            return ResponseService.serverError(res);
        }
    }
}

module.exports = ProjectsApi;
