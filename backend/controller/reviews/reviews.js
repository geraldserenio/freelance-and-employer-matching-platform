const { Reviews, Project } = require("../../models");

const getRecommendedProject = async (user_id) => {
  try {
    const result = await Reviews.findOne({
      where: { user_id: user_id, is_recommended: true },
      include: [
        {
          model: Project,
          as: "project_reviews",
          required: false,
        },
      ],
    });

    return {
      data: result,
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

module.exports = {
  getRecommendedProject,
};
