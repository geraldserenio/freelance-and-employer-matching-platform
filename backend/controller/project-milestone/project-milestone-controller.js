const {
  ProjectMilestone,
  ProjectApplicants,
  User,
  Project,
  ProjectGigPayments,
  Reviews,
} = require("../../models");

const storeMilestoneController = async (file, data) => {
  data.attachment = file ? file.filename : null;
  data.status = "pending";
  try {
    const store = (await data?.id)
      ? await ProjectMilestone.update(
          {
            remarks: data?.remarks,
            amount: data?.amount,
            attachment: file ? file.filename : data?.attachment,
            status: data?.status,
          },
          { where: { id: data?.id } }
        )
      : ProjectMilestone.create(data);

    if (!store) {
      return false;
    }

    return store;
  } catch (error) {
    console.error("Error saving file to database:", error);
  }
};

//for freelancers
const getAllProjectMilestoneByUserIdController = async (
  user_id,
  status,
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;

    const total = await ProjectMilestone.count({
      where: { is_active: true, user_id: user_id },
    });

    const list = await ProjectMilestone.findAll({
      attributes: {
        exclude: ["project_id"],
      },
      offset: offset,
      limit: limit,
      where: status
        ? { status: status, is_active: true, user_id: user_id }
        : { is_active: true, user_id: user_id },
      include: [
        {
          model: ProjectApplicants,
          as: "project_milestone_for_freelancer",
          required: true,
          include: [
            {
              model: Project,
              as: "project_gig_details",
              required: true,
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

//for client
const getAllProjectMilestoneByProjectGigIdController = async (projectGigId) => {
  try {
    const list = await ProjectMilestone.findAll({
      attributes: {
        exclude: ["project_id"],
      },
      where: { is_active: true, project_applicants_id: projectGigId },
    });

    return {
      data: list,
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

const storeGigPayemtns = async (data) => {
  try {
    await ProjectMilestone.update(
      {
        status: "approved",
      },
      { where: { id: data?.project_milestone_id } }
    );

    await ProjectApplicants.update(
      {
        status: "completed",
      },
      { where: { id: data?.project_proposal_id } }
    );

    await ProjectGigPayments.create({
      user_id: data?.userId,
      project_milestone_id: data?.project_milestone_id,
      status: "pending",
      stripe_id: data?.stripe_id,
      amount: data?.amount,
      email: data?.email,
      country: data?.country,
    });

    return {
      data: "success",
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

const updateGigPaymentStatus = async (data) => {
  try {
    await ProjectGigPayments.update(
      { status: data?.status },
      { where: { stripe_id: data?.stripe_id } }
    );

    return {
      data: "success",
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

const getPendingProjectMilestoneByIdController = async (user_id) => {
  try {
    const result = await ProjectMilestone.findOne({
      where: { status: "pending" },
      include: [
        {
          model: ProjectApplicants,
          as: "project_milestone_for_freelancer",
          required: true,
          include: [
            {
              model: Project,
              as: "project_gig_details",
              required: true,
              where: { business: user_id },
            },
          ],
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

const getNeedsRevisionProjectMilestoneByIdController = async (user_id) => {
  try {
    const result = await ProjectMilestone.findOne({
      where: { user_id: user_id, status: "needs_revision" },
    });

    return {
      data: result,
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

const getAlreadySubmittedMilestoneFreelancerController = async (
  project_applicants_id
) => {
  try {
    const result = await ProjectMilestone.count({
      where: {
        project_applicants_id: project_applicants_id,
        status: "pending",
      },
    });

    return {
      data: result,
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

const updateStatusToNeedsReivisionController = async (
  project_proposal_id,
  newRemarks
) => {
  try {
    const result = await ProjectMilestone.update(
      {
        status: "needs_revision",
        remarks: newRemarks,
      },
      { where: { project_applicants_id: project_proposal_id } }
    );

    if (!result) {
      return false;
    }

    return result;
  } catch (error) {
    console.error("AcceptOrAcceptGIGProposal Error:", error);
    res.status(500).json({ error: "Database error" });
  }
};

const getSpecificProjectMilestoneByActualIdController = async (id) => {
  try {
    const result = await ProjectMilestone.findOne({
      where: { id: id },
      include: [
        {
          model: ProjectApplicants,
          as: "project_milestone_for_freelancer",
          required: true,
          include: [
            {
              model: User,
              as: "gig_applicants",
              required: true,
            },
            {
              model: Project,
              as: "project_gig_details",
              required: true,
              include: [
                {
                  model: User,
                  as: "businessUser",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    });
    const clientsComments = await Reviews.findOne({
      where: {
        project_id: result?.project_milestone_for_freelancer?.project_id,
      },
    });

    await ProjectMilestone.update(
      { read: true },
      { where: { project_applicants_id: id } }
    );

    return {
      data: result,
      clientsComments: clientsComments,
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

const getSpecificProjectMilestoneByIdController = async (id) => {
  try {
    const result = await ProjectMilestone.findOne({
      where: { project_applicants_id: id },
      include: [
        {
          model: ProjectApplicants,
          as: "project_milestone_for_freelancer",
          required: true,
          include: [
            {
              model: User,
              as: "gig_applicants",
              required: true,
            },
          ],
        },
      ],
    });

    await ProjectMilestone.update(
      { read: true },
      { where: { project_applicants_id: id } }
    );

    return {
      data: result,
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

module.exports = {
  getAllProjectMilestoneByProjectGigIdController,
  getSpecificProjectMilestoneByIdController,
  getAllProjectMilestoneByUserIdController,
  storeMilestoneController,
  storeGigPayemtns,
  updateGigPaymentStatus,
  getNeedsRevisionProjectMilestoneByIdController,
  updateStatusToNeedsReivisionController,
  getPendingProjectMilestoneByIdController,
  getAlreadySubmittedMilestoneFreelancerController,
  getSpecificProjectMilestoneByActualIdController,
};
