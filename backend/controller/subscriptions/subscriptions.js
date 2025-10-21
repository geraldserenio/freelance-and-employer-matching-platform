const {
  Subscriptions,
  SubscriptionInclusions,
  Subscribed,
  User,
} = require("../../models");

const getSubscriptions = async (user_type, type, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const totalSubscriptions = await Subscriptions.count();
    const userType = user_type == "freelancers" ? "freelancer" : "business";

    const subscriptions = await Subscriptions.findAll({
      offset: offset,
      limit: limit,
      where: user_type ? { type, user_type: userType } : { type },
      order: [["id", type == "yearly" ? "DESC" : "ASC"]],
      include: [
        {
          model: SubscriptionInclusions,
          as: "subscription_inclusions",
          order: [["id", "ASC"]],
        },
      ],
    });

    const totalPages = Math.ceil(totalSubscriptions / limit);

    return {
      data: subscriptions,
      meta: {
        total: totalSubscriptions,
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

const updateSubscriptionStatus = async (data) => {
  try {
    await User.update({ step: 2 }, { where: { id: data?.userId } });

    await Subscribed.update(
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

module.exports = {
  getSubscriptions,
  updateSubscriptionStatus,
};
