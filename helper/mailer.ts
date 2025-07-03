import User from "@/models/user.model";
import { MailerType } from "@/types/mailerTypes";
import nodeMailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { generateTokenExpiry } from "./generateTokenExpiry";

const selectEmailSubject = (emailType: string) => {
	return emailType === "VERIFY_EMAIL" ? "Verify Your Email" : "RESET_PASSWORD";
};

const generateHtmlResponse = (emailType: string, token: string) => {
	if (emailType === "VERIFY_EMAIL") {
		return `<p>Hey There Thank you for signing up! Please verify your email by clicking the link below : <a href="${process.env.DOMAIN}/verify-email?token=${token}">Verify Email</a></p>
    <br>
    <p>or just copy and paste the following link into your browser:</p>
    <p>${process.env.DOMAIN}/verify-email?token=${token}</p>`;
	} else
		return `<p>Hey There To Rest Your Password please link on the link below and if will redirect you to the rest-password page.</p>
    <br>
    <a href="${process.env.DOMAIN}/reset-password?token=${token}">Verify Email</a>
    <p>or just copy and paste the following link into your browser:</p>
    <p>${process.env.DOMAIN}/reset-password?token=${token}</p>`;
};

const sendEmail = async ({ email, emailType, userId }: MailerType) => {
	try {
		const hashedToken = uuidv4();

		if (emailType === "VERIFY_EMAIL") {
			await User.findByIdAndUpdate(userId, {
				$set: {
					verifyToken: hashedToken,
					verifyTokenExpiry: generateTokenExpiry(),
				},
			});
		} else if (emailType === "RESET_PASSWORD") {
			await User.findByIdAndUpdate(userId, {
				$set: {
					forgotPasswordToken: hashedToken,
					forgotPasswordTokenExpiry: generateTokenExpiry(),
				},
			});
		}

		const transporter = nodeMailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: Number(process.env.EMAIL_HOST_RUNNING_PORT),
			auth: {
				user: process.env.MAILER_USER,
				pass: process.env.MAILER_PASSWORD,
			},
		});

		const mailOptions = {
			from: "subhajitchowhan8@gmail.com",
			to: email,
			subject: selectEmailSubject(emailType),
			html: generateHtmlResponse(emailType, hashedToken),
		};

		const mailerResponse = await transporter.sendMail(mailOptions);
		return mailerResponse;
	} catch (error: any) {
		console.error("Error sending email:", error.message);
		throw new Error(error.message);
	}
};

export default sendEmail;
