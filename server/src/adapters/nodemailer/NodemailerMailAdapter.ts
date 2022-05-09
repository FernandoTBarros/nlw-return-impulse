import { MailAdapter, SendMailData } from "../MailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "29c162963f1eae",
		pass: "8769038b02b6f9"
	}
});

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({subject, body}: SendMailData) {
		await transport.sendMail({
			from: 'Equipe Feedget <oi@feedget.com>',
			to: "Fernando <fernando.tbarros@gmail.com>",
			subject,
			html: body
		})
	}

}