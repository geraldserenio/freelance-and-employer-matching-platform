const {
  Project,
  JobListing,
  JobApplicant,
  User,
  Reviews,
} = require("../../models");
const { Op, where } = require("sequelize");

const getAllProjectsByBusinessId = async (
  userId,
  status = null,
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;

    const totalProjects = await Project.count({
      where: { business: userId, is_active: true },
    });

    const projects = await Project.findAll({
      offset: offset,
      limit: limit,
      where: status
        ? { business: userId, status: status, is_active: true }
        : { business: userId, is_active: true },
    });

    const totalPages = Math.ceil(totalProjects / limit);

    return {
      data: projects,
      meta: {
        total: totalProjects,
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

const browseProjects = async (
  filters,
  page = 1,
  status = "open",
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;

    // Build the dynamic where clause
    const whereClause = {
      is_active: true,
      ...(status && { status }),
    };

    if (filters) {
      if (filters.contract_type?.length) {
        whereClause.contract_type = { [Op.in]: filters.contract_type };
      }
      if (filters.experience_level?.length) {
        whereClause.experience_level = { [Op.in]: filters.experience_level };
      }
      if (filters.salary?.length) {
        whereClause.salary = { [Op.in]: filters.salary };
      }
      if (filters.location?.length) {
        whereClause.location = { [Op.in]: filters.location };
      }
      if (filters.project_name?.length) {
        whereClause.project_name = {
          [Op.iLike]: `%${filters.project_name[0]}%`, // only filters by the first name; can be expanded
        };
      }
    }

    const totalProjects = await Project.count({ where: whereClause });

    const projects = await Project.findAll({
      offset,
      limit,
      where: whereClause,
      include: [
        {
          model: User,
          as: "businessUser",
          required: false,
          where: { is_active: true },
        },
      ],
    });

    const totalPages = Math.ceil(totalProjects / limit);

    return {
      data: projects,
      meta: {
        total: totalProjects,
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

const getAllProjectsByBusinessIdForDropdown = async (userId, status = null) => {
  try {
    const projects = await Project.findAll({
      where: status
        ? { business: userId, status: status, is_active: true }
        : { business: userId, is_active: true },
    });

    return {
      data: projects,
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

const getProjectByDeadline = async (
  deadline,
  businessId,
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;

    const totalProjects = await Project.count({
      where: { deadline: deadline, business: businessId },
    });

    const projects = await Project.findAll({
      offset: offset,
      limit: limit,
      where: { deadline: deadline, business: businessId },
    });

    const totalPages = Math.ceil(totalProjects / limit);

    return {
      data: projects,
      meta: {
        total: totalProjects,
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

const getProjectById = async (id, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const totalProjects = await Project.count({ where: { id: id } });

    const projects = await Project.findAll({
      offset: offset,
      limit: limit,
      where: { id: id },
      include: [
        {
          model: JobListing,
          as: "job_listings",
          required: false,
          where: { is_active: true },
          include: [
            {
              model: JobApplicant,
              as: "job_applicants",
              where: { status: "hired", is_active: true },
              required: false,
              include: [
                {
                  model: User,
                  as: "applicants",
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: "businessUser",
          required: false,
          where: { is_active: true },
        },
      ],
    });

    const totalPages = Math.ceil(totalProjects / limit);

    return {
      data: projects,
      meta: {
        total: totalProjects,
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

const storeProject = async (data) => {
  try {
    const store = data?.id
      ? await Project.update(
          {
            project_name: data?.project_name,
            project_description: data?.project_description,
            deadline: data?.deadline,
            payment_conditions: data?.payment_conditions,
            status: data?.status,
            business: data?.business,
          },
          { where: { id: data?.id } }
        )
      : await Project.create({
          project_name: data?.project_name,
          project_description: data?.project_description,
          deadline: data?.deadline,
          payment_conditions: data?.payment_conditions,
          status: data?.status,
          business: data?.business,
        });

    if (!store) {
      return false;
    }

    return store;
  } catch (error) {
    console.error("Error saving file to database:", error);
    res.status(500).json({ error: "Database error" });
  }
};

const storeReview = async (data) => {
  try {
    const store = await Reviews.create({
      stars: data?.review,
      reviews: data?.stars,
      user_id: data?.user_id,
      project_id: data?.projectId,
    });

    if (!store) {
      return false;
    }

    return store;
  } catch (error) {
    console.error("Error saving file to database:", error);
    res.status(500).json({ error: "Database error" });
  }
};

const deleteProject = async (id) => {
  try {
    const deleted = await Project.update(
      {
        is_active: false,
      },
      { where: { id: id } }
    );

    if (!deleted) {
      return false;
    }

    return deleted;
  } catch (error) {
    console.error("Error saving file to database:", error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = {
  getAllProjectsByBusinessId,
  storeProject,
  getProjectById,
  deleteProject,
  getAllProjectsByBusinessIdForDropdown,
  browseProjects,
  storeReview,
  getProjectByDeadline,
};
