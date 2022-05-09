import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
	{ create: createFeedbackSpy },
	{ sendMail: sendMailSpy },
)

describe('Submit feedback', () => {
	it('should be able to submit a feedback', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'test comment',
			screenshot: 'data:image/png;base64,fafafa'
		})).resolves.not.toThrow();

		expect(createFeedbackSpy).toBeCalled();
		expect(sendMailSpy).toBeCalled();
	})

	it('should not be able to submit a feedback without a type', async () => {
		await expect(submitFeedback.execute({
			type: '',
			comment: 'test comment',
			screenshot: 'data:image/png;base64,fafafa'
		})).rejects.toThrow();
	})

	it('should not be able to submit a feedback without a comment', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: '',
			screenshot: 'data:image/png;base64,fafafa'
		})).rejects.toThrow();
	})
	it('should not be able to submit a feedback with an invalid screenshot', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'test comment',
			screenshot: 'test.png'
		})).rejects.toThrow();
	})
})