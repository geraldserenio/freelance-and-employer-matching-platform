const { Payment, JobListing, Project, User } = require("../../models");

const getPaymentsByFreelancerIdController = async (
  userId,
  status = null,
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;

    const total = await Payment.count({
      where: { freelancer_id: userId, is_active: true },
    });

    const list = await Payment.findAll({
      offset: offset,
      limit: limit,
      where: status
        ? { freelancer_id: userId, status: status, is_active: true }
        : { freelancer_id: userId, is_active: true },
      include: [
        {
          model: JobListing,
          as: "job_listings",
          required: false,
          include: [
            {
              model: Project,
              as: "project",
              required: false,
            },
            {
              model: User,
              as: "users",
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

const getPaymentsByIdController = async (
  id,
  status = null,
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;

    const list = await Payment.findOne({
      offset: offset,
      limit: limit,
      where: status
        ? { id: id, status: status, is_active: true }
        : { id: id, is_active: true },
      include: [
        {
          model: JobListing,
          as: "job_listings",
          required: false,
          include: [
            {
              model: Project,
              as: "project",
              required: false,
            },
            {
              model: User,
              as: "users",
              required: false,
            },
          ],
        },
        {
          model: User,
          as: "payment_freelancers",
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

const getPaymentsByBusinessIdController = async (
  userId,
  status,
  page = 1,
  limit = 10
) => {
  try {
    try {
      const offset = (page - 1) * limit;

      const total = await Payment.count({
        where: status
          ? { status: status, is_active: true }
          : { is_active: true },
        include: [
          {
            model: JobListing,
            as: "job_listings",
            required: true,
            where: userId ? { created_by: userId } : undefined,
            include: [
              {
                model: Project,
                as: "project",
                required: false,
              },
              {
                model: User,
                as: "users",
                required: false,
              },
            ],
          },
          {
            model: User,
            as: "payment_freelancers",
            required: false,
          },
        ],
      });

      const list = await Payment.findAll({
        offset: offset,
        limit: limit,
        where: status
          ? { status: status, is_active: true }
          : { is_active: true },
        include: [
          {
            model: JobListing,
            as: "job_listings",
            required: true,
            where: userId ? { created_by: userId } : undefined,
            include: [
              {
                model: Project,
                as: "project",
                required: false,
              },
              {
                model: User,
                as: "users",
                required: false,
              },
            ],
          },
          {
            model: User,
            as: "payment_freelancers",
            required: false,
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
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

const storePayment = async (data) => {
  try {
    const store = data?.id
      ? await Payment.update(
          {
            amount: data?.amount,
            remarks: data?.remarks,
            status: data?.status,
          },
          { where: { id: data?.id } }
        )
      : await Payment.create(data);

    if (!store) {
      return false;
    }

    return store;
  } catch (error) {
    console.error("Error saving file to database:", error);
    res.status(500).json({ error: "Database error" });
  }
};

const deletePaymentsontroller = async (id) => {
  try {
    const deleted = await Payment.update(
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

const updatePaymentStatusontroller = async (id, status) => {
  try {
    const result = await Payment.update(
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
    console.error("Error saving file to database:", error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = {
  getPaymentsByFreelancerIdController,
  getPaymentsByIdController,
  getPaymentsByBusinessIdController,
  storePayment,
  deletePaymentsontroller,
  updatePaymentStatusontroller,
};
