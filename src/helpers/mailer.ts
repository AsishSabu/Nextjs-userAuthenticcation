import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import nodemailer from "nodemailer";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    console.log(hashedToken,"hashedToken");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashedToken, verifyExpires: Date.now() + 3600000 },
        { new: true }
      );
    } else if (emailType === "FORGOT") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpires: Date.now() + 3600000,
        },
        { new: true }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.APP_ID,
        pass: process.env.APP_PASSWORD,
      },
    });
console.log(transporter);

    const mailOptions = {
      from: "asish@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your email",
      html: `
      <h1>Hello!</h1>
      <p>Please click
<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>
  `,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log(mailResponse,"mailResponse")
    return mailResponse;
  } catch (error:any) {
    throw new Error(error.message);
  }
};
