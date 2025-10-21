const {
  User,
  Skill,
  Experience,
  Reviews,
  Subscribed,
} = require("../../models");
const bcrypt = require("bcryptjs");
const { Op, where } = require("sequelize");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SK_LIVE || "");

const getUsers = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;

    const totalUsers = await User.count();

    const users = await User.findAll({
      offset: offset,
      limit: limit,
    });

    const totalPages = Math.ceil(totalUsers / limit);

    return {
      data: users,
      meta: {
        total: totalUsers,
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

const authenticateUser = async (data) => {
  const { email } = data;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return false;
  }

  return user;
};

const registerDevice = async (user_id, deviceId) => {};

const createUser = async (userData) => {
  const { first_name, last_name, email, user_type, password, nationality } =
    userData;

  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use.");
  }

  // Hash the password before saving
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create new user
  const newUser = await User.create({
    first_name,
    last_name,
    email,
    user_type,
    nationality,
    password: hashedPassword, // Store the hashed password
    is_active: true, // Default to active user
  });
  return { newUser };
};

const enableEdisableUser = async (status, id) => {
  // enable/disable new user
  const [affectedRows, updatedUsers] = await User.update(
    { is_active: status }, // Fields to update
    {
      where: { id: id },
    }
  );

  return { updatedUsers };
};

const getUserById = async (id) => {
  try {
    const user = await User.findOne({
      where: { id: id },
      include: [
        {
          model: Skill,
          as: "skills",
          required: false,
        },
        {
          model: Experience,
          as: "experiences",
          required: false,
        },
      ],
    });

    return {
      data: user,
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

const createStripeAccountController = async (req, res) => {
  // // Get token from authorization header
  // const token = req.headers.authorization?.split(" ")[1];
  // console.log(token);
  // if (!token) {
  //   return res.status(401).json({ message: "No token provided" });
  // }
  // const verifiedToken = await verifyToken(token);
  // if (verifiedToken) {
  try {
    const account = await stripe.accounts.create({
      type: "express",
    });
    const freelancer_id = req.query.freelancer_id;

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "https://staging.liber-x.com/profile",
      return_url: "https://staging.liber-x.com/profile",
      type: "account_onboarding",
    });

    await User.update(
      { stripe_account: account.id },
      { where: { id: freelancer_id } }
    );

    res.json({ url: accountLink.url, accountId: account.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  // } else {
  //   return res.status(401).json({ message: "No token provided" });
  // }
};

const browseFreelancers = async (filters, page = 1, limit = 100) => {
  try {
    const offset = (page - 1) * limit;

    // Build the dynamic where clause
    const whereClause = {
      is_active: true,
      user_type: "freelancers",
    };

    if (filters) {
      if (filters.contract_type?.length) {
        whereClause.years_of_experience = { [Op.in]: filters.contract_type };
      }
      if (filters.experience_level?.length) {
        whereClause.experience_level = { [Op.in]: filters.experience_level };
      }
      if (filters.first_name?.length) {
        whereClause.first_name = {
          [Op.iLike]: `%${filters.first_name[0]}%`, // only filters by the first name; can be expanded
        };
      }
    }

    const totalProjects = await User.count({ where: whereClause });

    const projects = await User.findAll({
      offset,
      limit,
      where: whereClause,
      include: [
        {
          model: Skill,
          as: "skills",
          required: false,
          where: { is_active: true },
        },
        {
          model: Experience,
          as: "experiences",
          required: false,
          where: { is_active: true },
        },
        {
          model: Reviews,
          as: "reviews",
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

const verifyUser = async (id) => {
  try {
    const user = await User.update(
      {
        is_verified: true,
      },
      { where: { email: id } }
    );

    return {
      data: user,
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

const storeSubscription = async (data) => {
  try {
    await User.update(
      {
        step: data?.subscription_id == 1 || data?.subscription_id == 4 ? 2 : 1,
        subscription_id: data?.subscription_id,
      },
      { where: { id: data?.userId } }
    );

    await Subscribed.create({
      user_id: data?.userId,
      subscription_id: data?.subscription_id,
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

const updateUserById = async (file, data) => {
  try {
    const saltRounds = 10;
    await Skill.destroy({ where: { user_id: data?.id } });
    await Experience.destroy({ where: { user_id: data?.id } });
    const skills = JSON.parse(data?.skills);
    const experiences = JSON.parse(data?.experience);
    const skillData = skills.map((skill) => ({
      user_id: data?.id,
      skill_name: skill,
      description: "",
    }));

    const experienceData = experiences.map((exp) => ({
      user_id: data?.id,
      experience_name: exp,
      description: "",
    }));

    await Skill.bulkCreate(skillData);
    await Experience.bulkCreate(experienceData);
    const isFreelanceStep3 =
      data?.first_name !== "null" &&
      data?.last_name !== "null" &&
      data?.mobile !== "null" &&
      experienceData?.length > 0 &&
      skillData?.length > 0;

    const user = data?.new_password
      ? await User.update(
          {
            photo: file ? file.filename : data?.photo,
            about: data?.about !== "null" ? data?.about : "",
            first_name: data?.first_name !== "null" ? data?.first_name : "",
            middle_name: data?.middle_name !== "null" ? data?.middle_name : "",
            last_name: data?.last_name !== "null" ? data?.last_name : "",
            mobile: data?.mobile !== "null" ? data?.mobile : "",
            company_type:
              data?.company_type !== "null" ? data?.company_type : "",
            company_size:
              data?.company_size !== "null" ? data?.company_size : "",
            company_website:
              data?.company_website !== "null" ? data?.company_website : "",
            is_first_time_logged_in: data?.about ? false : true,
            address: data?.address !== "null" ? data?.address : "",
            password: await bcrypt.hash(data?.new_password, saltRounds),
            step: isFreelanceStep3 ? 3 : 2,
          },
          { where: { id: data?.id } }
        )
      : await User.update(
          {
            photo: file ? file.filename : data?.photo,
            about: data?.about !== "null" ? data?.about : "",
            first_name: data?.first_name !== "null" ? data?.first_name : "",
            middle_name: data?.middle_name !== "null" ? data?.middle_name : "",
            last_name: data?.last_name !== "null" ? data?.last_name : "",
            mobile: data?.mobile !== "null" ? data?.mobile : "",
            is_first_time_logged_in: data?.about ? false : true,
            company_type:
              data?.company_type !== "null" ? data?.company_type : "",
            company_size:
              data?.company_size !== "null" ? data?.company_size : "",
            company_website:
              data?.company_website !== "null" ? data?.company_website : "",
            address: data?.address !== "null" ? data?.address : "",
            step: isFreelanceStep3 ? 3 : 2,
          },
          { where: { id: data?.id } }
        );

    return {
      data: user,
    };
  } catch (error) {
    console.error("Server error:", error);
    return error;
  }
};

module.exports = {
  getUsers,
  authenticateUser,
  createUser,
  enableEdisableUser,
  getUserById,
  updateUserById,
  verifyUser,
  browseFreelancers,
  storeSubscription,
  createStripeAccountController,
};
