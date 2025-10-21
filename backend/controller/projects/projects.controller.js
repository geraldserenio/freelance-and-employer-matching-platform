const { Project, FreelancerProject, sequelize } = require("../../models");
const { ProjectSkillRequired } = require("../../models");
const { Skill } = require("../../models");
const { User } = require("../../models");

class ProjectsController {
  //@TODO update when being recommended is clarified
  static async getRecommended() {
    const recommended = await Project.findOne({
      where: { is_recommended: true },
      include: [
        {
          model: ProjectSkillRequired,
          as: "requiredSkills",
          include: [
            {
              model: Skill,
              as: "skill",
              attributes: ["id", "skill_name", "description"],
            },
          ],
        },
        {
          model: User,
          as: "businessUser",
          attributes: ["id", "first_name", "last_name"],
        },
      ],
    });

    return {
      data: recommended,
    };
  }

  static async getFreelancerProjectStats(userId) {
    const stats = await FreelancerProject.findAll({
      where: { freelancer_id: userId },
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("id")), "total_projects"],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal(
              `CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END`
            )
          ),
          "completed_projects",
        ],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal(
              `CASE WHEN status = 'CANCELLED' THEN 1 ELSE 0 END`
            )
          ),
          "cancelled_projects",
        ],
        [
          sequelize.fn(
            "ROUND",
            sequelize.literal(
              `(SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) * 100.0) / NULLIF(COUNT(id), 0)`
            ),
            2
          ),
          "completion_average",
        ],
      ],
      raw: true,
    });

    return {
      data: stats[0],
    };
  }

  static async getFreelancerActiveProjects(userId) {
    const recommended = await FreelancerProject.findAll({
      where: {
        freelancer_id: userId,
        is_active: true,
      },
      include: [
        {
          model: Project,
          as: "project",
          include: [
            {
              model: ProjectSkillRequired,
              as: "requiredSkills",
              include: [
                {
                  model: Skill,
                  as: "skill",
                  attributes: ["id", "skill_name", "description"],
                },
              ],
            },
            {
              model: User,
              as: "businessUser",
              attributes: ["id", "first_name", "last_name"],
            },
          ],
        },
      ],
    });

    return {
      data: recommended,
    };
  }
}

module.exports = ProjectsController;
