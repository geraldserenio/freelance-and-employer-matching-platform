const { Courses, User } = require("../../models");

const getAllCoursesController = async (
  userType,
  userId,
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;

    const total = await Courses.count({
      where:
        userType == "admin"
          ? { is_active: true, status: "pending" }
          : { user_id: userId, is_active: true },
    });

    const result = await Courses.findAll({
      offset: offset,
      limit: limit,
      where:
        userType == "admin"
          ? { is_active: true, status: "pending" }
          : { user_id: userId, is_active: true },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: result,
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

const getAllCoursesByCategortController = async (
  category,
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;

    const total = await Courses.count({
      where: { category: category, is_active: true, status: "published" },
    });

    const result = await Courses.findAll({
      offset: offset,
      limit: limit,
      where: { category: category, is_active: true, status: "published" },
      include: [
        {
          model: User,
          as: "course_user",
          required: false,
        },
      ],
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: result,
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

const getCourseByIdController = async (id) => {
  try {
    const list = await Courses.findOne({
      where: { id: id, is_active: true },
      include: [
        {
          model: User,
          as: "course_user",
          required: false,
        },
      ],
    });

    return {
      data: list,
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

const storeCoursesController = async (data) => {
  try {
    const store = data?.id
      ? await Courses.update(
          {
            title: data?.title,
            content: data?.content,
            user_id: data?.user_id,
            status: data?.status,
            user_type: data?.user_type,
          },
          { where: { id: data?.id } }
        )
      : await Courses.create({
          title: data?.title,
          content: data?.content,
          user_id: data?.user_id,
          status: data?.status,
          user_type: data?.user_type,
        });

    if (!store) {
      return false;
    }

    return store;
  } catch (error) {
    console.error("Error saving file to database:", error);
  }
};

const deleteCourseController = async (id) => {
  try {
    const deleted = await Courses.update(
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

const updatePublishStatusByIdController = async (id, status) => {
  try {
    const deleted = await Courses.update(
      {
        status: status,
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
  getAllCoursesController,
  storeCoursesController,
  getCourseByIdController,
  deleteCourseController,
  updatePublishStatusByIdController,
  getAllCoursesByCategortController,
};
