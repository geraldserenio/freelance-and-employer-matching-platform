const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: process.env.DEBUG === "development" ? console.log : false,
      dialectOptions: {
        connectTimeout: 20000,
        ssl: false,
      },
    })
  : new Sequelize({
      database: process.env.DB_NAME,
      dialect: "postgres",
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      logging: process.env.DEBUG === "development" ? console.log : false,
      dialectOptions: {
        connectTimeout: 20000,
        ssl: false,
      },
    });

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "✅ Connection to PostgreSQL has been established successfully."
    );
  })
  .catch((error) => {
    console.error("❌ Unable to connect to the database:", error);
  });

module.exports = sequelize;
