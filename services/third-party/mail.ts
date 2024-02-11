import sgMail, { MailDataRequired } from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export class MailService {
  static async sendMail({
    recipient,
    subject,
    url,
  }: {
    recipient: string
    subject?: string
    url?: string
  }): Promise<void> {
    try {
      const msg: MailDataRequired = {
        to: recipient,
        from: process.env.SENDER_EMAIL as string,
        templateId: process.env.SENDGRID_TEMPLATE_ID as string,
        dynamicTemplateData: {
          subject: subject,
          resetUrl: url,
        },
      }
      await sgMail.send(msg)
    } catch (error) {
      console.log(error)
      throw new Error('There was an error sending the email')
    }
  }
}
