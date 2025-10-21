const { Subscribed } = require("../../models");

const getSubscribed = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const total = await Subscribed.count();

    const subscribed = await Subscribed.findAll({
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: subscribed,
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

module.exports = {
  getSubscribed,
};
