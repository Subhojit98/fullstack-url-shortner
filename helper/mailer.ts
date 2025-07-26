import User from "@/models/user.model";
import { MailerType } from "@/types/mailerTypes";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import { generateTokenExpiry } from "./generateTokenExpiry";

const selectEmailSubject = (emailType: string): string => {
	return emailType === "VERIFY_EMAIL" ? "Verify Your Email" : "RESET_PASSWORD";
};

const generateHtmlResponse = (emailType: string, token: string) => {
	if (emailType === "VERIFY_EMAIL") {
		return `<p>Hey There Thank you for signing up! Please verify your email by clicking the link below : <a href="${process.env.NEXT_PUBLIC_DOMAIN}/verify-email?token=${token}">Verify Email</a></p>
    <br>
    <p>or just copy and paste the following link into your browser:</p>
    <p>${process.env.NEXT_PUBLIC_DOMAIN}/verify-email?token=${token}</p>`;
	} else
		return `<p>Hey There To Rest Your Password please link on the link below and if will redirect you to the rest-password page.</p>
    <br>
    <a href="${process.env.NEXT_PUBLIC_DOMAIN}/reset-password?token=${token}">Verify Email</a>
    <p>or just copy and paste the following link into your browser:</p>
    <p>${process.env.NEXT_PUBLIC_DOMAIN}/reset-password?token=${token}</p>`;
};

const resend = new Resend(process.env.RESEND_API_KEY);

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

		console.log("email:", email);

		const mailOptions = {
			from: `Shortyfy <onboarding@resend.dev>`,
			to: `${email}`,
			subject: selectEmailSubject(emailType),
			html: generateHtmlResponse(emailType, hashedToken),
		};

		const mailerResponse = await resend.emails.send(mailOptions);
		console.log(mailerResponse.data);
		console.log(mailerResponse.error);
		return mailerResponse;
	} catch (error: any) {
		console.error("Error sending email:", error.message);
		throw new Error(error.message);
	}
};

export default sendEmail;
