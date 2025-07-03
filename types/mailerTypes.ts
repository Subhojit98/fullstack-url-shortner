type MailerType = {

    email:string,
    emailType: "VERIFY_EMAIL" | "RESET_PASSWORD",
    userId?:string
}

export type { MailerType }