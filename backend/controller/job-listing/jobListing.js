const { User, JobListing, JobApplicant, Project } = require("../../models");
const { Op } = require("sequelize");

const getJobListings = async (
  id = null,
  status = "open",
  page = 1,
  filters = null,
  limit = 10
) => {
  try {
    let whereClause = {};
    if (id) {
      whereClause.id = id;
    }
    whereClause.status = status;
    if (filters) {
      for (const key in filters) {
        if (filters[key].length > 0) {
          whereClause[key] =
            key === "job_title"
              ? { [Op.like]: `%${filters[key][0]}%` }
              : filters[key]; // Direct array usage
        }
      }
    }
    const offset = (page - 1) * limit;

    const totalJobListings = await JobListing.count({ where: whereClause });

    const jobListings = await JobListing.findAll({
      offset: offset,
      limit: limit,
      where: whereClause,
      include: [
        {
          model: User,
          as: "users",
        },
      ],
    });

    const totalPages = Math.ceil(totalJobListings / limit);

    return {
      data: jobListings,
      meta: {
        total: totalJobListings,
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

const storeApplicantsController = async (
  filename,
  applicant_id,
  job_listing_id
) => {
  try {
    const storeApplicants = await JobApplicant.create({
      resume: `/uploads/${filename}`,
      applicant_id,
      job_listing_id,
    });

    if (!storeApplicants) {
      return false;
    }

    return storeApplicants;
  } catch (error) {
    console.error("Error saving file to database:", error);
    res.status(500).json({ error: "Database error" });
  }
};

const storeJobListingController = async (data) => {
  try {
    const storeJobListing = (await data?.id)
      ? JobListing.update(data, { where: { id: data?.id } })
      : JobListing.create(data);

    if (!storeJobListing) {
      return false;
    }

    return storeJobListing;
  } catch (error) {
    console.error("Error saving job listing database:", error);
    res.status(500).json({ error: "Database error" });
  }
};

const getAllJoblistingByBusinessIdController = async (
  userId,
  status = null,
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;

    const total = await JobListing.count({
      where: { created_by: userId, is_active: true },
    });

    const list = await JobListing.findAll({
      offset: offset,
      limit: limit,
      where: status
        ? { created_by: userId, status: status, is_active: true }
        : { created_by: userId, is_active: true },
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

const getJoblistingByIdController = async (id, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const totalProjects = await JobListing.count({ where: { id: id } });

    const projects = await JobListing.findAll({
      offset: offset,
      limit: limit,
      where: { id: id, is_active: true },
      include: [
        {
          model: Project,
          as: "project",
          required: false,
        },
        {
          model: JobApplicant,
          as: "job_applicants",
          required: false,
          include: [
            {
              model: User,
              as: "applicants",
              required: false,
            },
          ],
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

const deleteJoblistingController = async (id) => {
  try {
    const deleted = await JobListing.update(
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
  getJobListings,
  storeApplicantsController,
  storeJobListingController,
  deleteJoblistingController,
  getJoblistingByIdController,
  getAllJoblistingByBusinessIdController,
};
