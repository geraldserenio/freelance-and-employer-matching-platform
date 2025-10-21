const fs = require('fs');
const Handlebars = require('handlebars');
const Mailgun = require('mailgun.js');
const FormData = require('form-data');

class MailgunClient {
    static instance = null;
    static DOMAIN = process.env.MAILGUN_DOMAIN_URL;
    static API_KEY = process.env.MAILGUN_API_KEY;


    static initialize() {
        if (!MailgunClient.instance) {
            console.log("Initializing Mailgun client...");

            const mailgun = new Mailgun(FormData);
            MailgunClient.instance = mailgun.client({
                username: 'api',
                key: MailgunClient.API_KEY,
            });

            console.log("MailgunClient instance created:", MailgunClient.DOMAIN);
            console.log("MailgunClient instance key:", MailgunClient.API_KEY);
        }
    }

    static compileTemplate(templatePath, data) {
        const fileContent = fs.readFileSync(templatePath, 'utf-8');
        const template = Handlebars.compile(fileContent);
        return template(data);
    }

    static async sendEmail(to, subject, from1 = "", templatePath, variables) {
        try {
            const from = process.env.MAILGUN_FROM_SENDER;
            MailgunClient.initialize(); // Ensure instance is created

            if (!MailgunClient.instance) {
                throw new Error("Mailgun client is not initialized");
            }

            const htmlContent = MailgunClient.compileTemplate(templatePath, variables);

            const emailData = {
                from,
                to,
                subject,
                html: htmlContent,
            };


            if (!MailgunClient.instance.messages) {
                throw new Error("Mailgun messages API is not available");
            }

            const response = await MailgunClient.instance.messages.create(
                MailgunClient.DOMAIN,
                emailData
            );

            console.log('Email sent successfully:', response);
            return true;
        } catch (error) {
            console.error('Error sending email:', error);
            return false;
        }
    }
}

module.exports = MailgunClient;
