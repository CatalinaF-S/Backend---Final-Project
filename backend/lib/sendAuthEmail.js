const sgMail = require("@sendgrid/mail");

const sendAuthEmail = (username, email) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: "catalina.fonseca.silva@gmail.com", // Change to your recipient
        from: "catalina.fonseca.silva@gmail.com", // Change to your verified sender
        subject: "Confirm your subscription to our newsletter",
        text: "Please verify your email",
        html: `Hello ${username}, ,<br>Thank you for subscribing to our newsletter. Please complete and confirm your subscription by clicking here</a>.`,
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent");
            return true;
        })
        .catch((error) => {
            console.error(error);
        });
    console.log(process.env);
};

// sendAuthEmail("catalina", "catalina.fonseca.silva@gmail.com");

module.exports = { sendAuthEmail };
