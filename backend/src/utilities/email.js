import nodemailer from 'nodemailer'
// option is a object // containing -> subject, reciever mail, message
const sendmail = async (option) => {
    // create transporter to transport the mail

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "f38d73d1c43379",
            pass: "****b6b7"
  }
    })

    const mailsample = {
        from: 'vote@gov.in',
        to: option.email,
        subject: option.subject,
        message: option.message
    }

    await transporter.sendmail(mailsample);
}

export default sendmail