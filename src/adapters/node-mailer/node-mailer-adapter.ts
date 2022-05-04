import { MailAdapter, sendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

export class NodeMailerMailAdapter implements MailAdapter {

    private transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b60cb73bd52a58",
          pass: "b9253d4d5064eb"
        }
    });
    
    sendMail({subject, body}: sendMailData) {
        this.transport.sendMail({    
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Luan Mineu Costa <luanwebdev@gmail.com>',
            subject,
            html: body
        })
    }
}