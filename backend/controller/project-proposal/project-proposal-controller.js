const { ProjectApplicants, Project, User } = require("../../models");

const storeProjectProposal = async (data) => {
  try {
    const store = data?.id
      ? await ProjectApplicants.update(
          {
            applicant_id: data?.applicant_id,
            project_id: data?.project_id,
            amount: data?.amount,
            message: data?.message,
            portfolio: data?.portfolio,
            status: data?.status,
            timeline: data?.timeline,
          },
          { where: { id: data?.id } }
        )
      : await ProjectApplicants.create({
          applicant_id: data?.applicant_id,
          project_id: data?.project_id,
          amount: data?.amount,
          message: data?.message,
          portfolio: data?.portfolio,
          status: data?.status,
          timeline: data?.timeline,
        });

    if (!store) {
      return false;
    }

    return store;
  } catch (error) {
    console.error("Error saving file to database:", error);
  }
};

const getAllAlreadyProposedFreelancerController = async (
  applicant_id,
  project_id
) => {
  try {
    const result = await ProjectApplicants.count({
      where: { applicant_id: applicant_id, project_id: project_id },
    });

    return {
      data: result,
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

//for freelancers
const getAllProjectProposalByApplicantIdController = async (
  applicant_id,
  status,
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;

    const total = await ProjectApplicants.count({
      where: { is_active: true, applicant_id: applicant_id },
    });

    const list = await ProjectApplicants.findAll({
      offset: offset,
      limit: limit,
      where: status
        ? { status: status, is_active: true, applicant_id: applicant_id }
        : { is_active: true, applicant_id: applicant_id },
      include: [
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
const getAllProjectProposalByBusinessIdController = async (
  client_id,
  status,
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;

    const total = await ProjectApplicants.count({
      where: { is_active: true },
      include: [
        {
          model: Project,
          as: "project_gig_details",
          required: true,
          where: { business: client_id },
        },
      ],
    });

    const list = await ProjectApplicants.findAll({
      offset: offset,
      limit: limit,
      where: status ? { status: status, is_active: true } : { is_active: true },
      include: [
        {
          model: Project,
          as: "project_gig_details",
          required: true,
          where: { business: client_id },
        },
        {
          model: User,
          as: "gig_applicants",
          required: true,
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

const getSpecificProjectProposalByIdController = async (id) => {
  try {
    const result = await ProjectApplicants.findOne({
      where: { id: id },
      include: [
        {
          model: Project,
          as: "project_gig_details",
          required: true,
        },
        {
          model: User,
          as: "gig_applicants",
          required: true,
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

const AcceptOrAcceptGIGProposalController = async (id, status) => {
  try {
    const result = await ProjectApplicants.update(
      {
        status: status,
      },
      { where: { id: id } }
    );

    const projectID = await ProjectApplicants.findOne({
      where: { id: id },
    });

    if (status == "in_progress" && projectID) {
      await updateProjectStatus(projectID?.project_id, "in_progress");
    }

    if (!result) {
      return false;
    }

    return result;
  } catch (error) {
    console.error("AcceptOrAcceptGIGProposal Error:", error);
    res.status(500).json({ error: "Database error" });
  }
};

const updateProjectStatus = async (id, status) => {
  try {
    const result = await Project.update(
      {
        status: status,
      },
      { where: { id: id } }
    );

    if (!result) {
      return false;
    }

    return result;
  } catch (error) {
    console.error("updateProjectStatus Error:", error);
  }
};

module.exports = {
  storeProjectProposal,
  getAllProjectProposalByBusinessIdController,
  getSpecificProjectProposalByIdController,
  AcceptOrAcceptGIGProposalController,
  getAllProjectProposalByApplicantIdController,
  updateProjectStatus,
  getAllAlreadyProposedFreelancerController,
};
