import { MailAdapter } from "../adapters/MailAdapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

export interface SubmitFeedbackUseCaseRequest {
	type: string;
	comment: string;
	screenshot?: string;
}

export class SubmitFeedbackUseCase {
	constructor(
		private feedbacksRepository:FeedbackRepository,
		private mailAdapter:MailAdapter
	) {}

	async execute(request: SubmitFeedbackUseCaseRequest) {
		const { type, comment, screenshot } = request;

		if(!type) {
			throw new Error('Type is required')
		}
		
		if(!comment) {
			throw new Error('Comment is required')
		}

		if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
			throw new Error('Invalid screenshot format')
		}

		await this.feedbacksRepository.create({
			type, comment, screenshot
		})

		await this.mailAdapter.sendMail({
			subject: 'Novo feedback',
			body: [
				`<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
				`<p>Tipo do feedback: ${type}</p>`,
				`<p>Comentário: ${comment}</p>`,
				screenshot ? `<a href='${screenshot}' target='_blank'><img style="width: 100%;" src='${screenshot}'/></a>` : '',
				`</div>`
			].join('')
		})

	}
}