const sgMail = require("@sendgrid/mail");

const sendAuthEmail = (username, email) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: email, // Change to your recipient
        from: "catalina.fonseca.silva@gmail.com", // Change to your verified sender
        subject: "Please verify your email",
        text: "Please verify your email",
        html: `<strong>Dear ${username}, please click here</strong>`,
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error);
        });
    console.log(process.env);
};

// sendAuthEmail("catalina", "catalina.fonseca.silva@gmail.com");

module.exports = { sendAuthEmail };
