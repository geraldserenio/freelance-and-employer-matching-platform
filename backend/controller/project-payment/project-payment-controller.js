const {
  ProjectGigPayments,
  ProjectMilestone,
  ProjectApplicants,
  User,
  Project,
} = require("../../models");

//for admin
const getAllProjectPaymentsByAdminController = async (
  status,
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;

    const total = await ProjectGigPayments.count({
      where: status ? { status: status, is_active: true } : { is_active: true },
    });

    const list = await ProjectGigPayments.findAll({
      offset: offset,
      limit: limit,
      where: status ? { status: status, is_active: true } : { is_active: true },
      include: [
        {
          model: ProjectMilestone,
          as: "project_milestone",
          required: true,
          include: [
            {
              model: ProjectApplicants,
              as: "project_milestone_for_freelancer",
              required: false,
            },
          ],
        },
      ],
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: list,
      meta: {
        total: total,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

const updateGigPaymentStatusesController = async (data) => {
  try {
    await ProjectGigPayments.update(
      {
        amount_sent: data?.amount,
        sent_status: "transferred",
        transfer_id: data?.transfer_id,
      },
      { where: { project_milestone_id: data?.id } }
    );

    return {
      data: "success",
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

module.exports = {
  getAllProjectPaymentsByAdminController,
  updateGigPaymentStatusesController,
};
