const { createUser } = require('../../controller/user-management/userController');
const ResponseService = require('../../services/response.service');
const MailgunClient = require('../../services/api-clients/mailgun.cient');
const path = require('path');
const jwt = require('jsonwebtoken');

class UserApis {
    static async signup(req, res) {
        try {
            const dataBody = req.body;
            const newUser = await createUser(dataBody);
            if (newUser) {

                const token = jwt.sign(
                    { userId: newUser?.newUser?.dataValues?.id, email: newUser?.newUser?.dataValues?.email, user_type: newUser?.newUser?.dataValues?.user_type },
                    process.env.JWT_TOKEN || "temporaryjwttoken",
                    { expiresIn: '5m' } // Set the expiration to 5 minutes
                );

                // Define email details
                const subject = "Welcome to Liber!";
                const templatePath = path.join(__dirname, "../../public/templates/verification-template.html");
                const verificationLink = `${process.env.NODE_ENV === "development" ? process.env.LOCAL_URL : process.env.PRODUCTION_URL}/verify?id=${dataBody.email}&&token=${token}`;

                const emailData = {
                    first_name: `${newUser?.newUser?.dataValues?.first_name} ${newUser?.newUser?.dataValues?.last_name}`,
                    verification_link: verificationLink,
                };

                // Send verification email
                await MailgunClient.sendEmail(
                    dataBody.email,
                    subject,
                    `Liber No-reply <no-reply>>`,
                    templatePath,
                    emailData
                );

                return ResponseService.created(res, token, newUser?.newUser?.dataValues);
            }

        } catch (error) {
            console.error("Signup error:", error);
            return ResponseService.serverError(res);
        }
    }
}

module.exports = { UserApis };
