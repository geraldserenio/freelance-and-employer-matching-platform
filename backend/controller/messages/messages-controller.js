const { Messages, User } = require("../../models");
const { Op } = require("sequelize");

const getConversationController = async (
  recipient,
  sender,
  status = null,
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;

    const whereClause = {
      is_active: true,
      [Op.or]: [
        { recipient: recipient, sender: sender },
        { recipient: sender, sender: recipient },
      ],
    };

    if (status !== null) {
      whereClause.status = status;
    }

    const total = await Messages.count({ where: whereClause });

    const list = await Messages.findAll({
      offset: offset,
      limit: limit,
      where: whereClause,
      order: [["created_at", "ASC"]],
      include: [
        {
          model: User,
          as: "senderId",
          required: false,
        },
        {
          model: User,
          as: "recipientId",
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
};

const getGuestConversationController = async (sender) => {
  const admin = 5;
  try {
    const existingUser = await User.findOne({
      where: { email: `guest@${sender}.local` },
    });

    const whereClause = {
      is_active: true,
      [Op.or]: [
        { recipient: admin, sender: existingUser?.id ? existingUser?.id : 0 },
        { recipient: existingUser?.id ? existingUser?.id : 0, sender: admin },
      ],
    };

    const list = await Messages.findAll({
      where: whereClause,
      order: [["created_at", "ASC"]],
    });

    return {
      data: list,
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

const getConversationListController = async (
  recipient,
  status = null,
  page = 1,
  limit = 1000
) => {
  try {
    const offset = (page - 1) * limit;

    const total = await Messages.count({
      where: status
        ? {
            recipient: recipient,
            status: status,
            is_active: true,
          }
        : { recipient: recipient, is_active: true },
    });

    const list = await Messages.findAll({
      offset: offset,
      limit: limit,
      where: status
        ? {
            recipient: recipient,
            status: status,
            is_active: true,
          }
        : { recipient: recipient, is_active: true },
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          as: "senderId",
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
};

const sendMessage = async (file, data) => {
  data.attachment = file ? file.filename : null;
  try {
    const store = (await data?.id)
      ? await Messages.update(
          {
            message: data?.message,
          },
          { where: { id: data?.id } }
        )
      : Messages.create(data);

    if (!store) {
      return false;
    }

    return store;
  } catch (error) {
    console.error("Error saving file to database:", error);
  }
};

const sendGuestMessageController = async (data) => {
  const admin = 5;
  try {
    const existingUser = await User.findOne({
      where: { email: `guest@${data?.ip}.local` },
    });
    if (existingUser) {
      data.sender = existingUser?.id;
      data.recipient = admin;
      await Messages.create(data);
    } else {
      const guestUser = await User.create({
        first_name: `${data?.guestFname} ${data?.guestLname}`,
        middle_name: "",
        last_name: data?.guestLname,
        email: `guest@${data?.ip}.local`,
        user_type: "freelancers",
        password: "guest", // Store the hashed password
        is_active: true, // Default to active user
      });
      data.sender = guestUser?.id;

      data.recipient = admin;
      await Messages.create(data);
    }

    return true;
  } catch (error) {
    console.error("Error saving file to database:", error);
  }
};

const unsendMessageController = async (id) => {
  try {
    const deleted = await Messages.update(
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
  getConversationController,
  getConversationListController,
  sendMessage,
  unsendMessageController,
  sendGuestMessageController,
  getGuestConversationController,
};
