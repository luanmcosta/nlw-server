import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Submit feedback', () => {

    const submitFeedback = new SubmitFeedbackUseCase(
        { create: createFeedbackSpy }, 
        { sendMail: sendMailSpy }
    )

    it('should be able to submit a feedback', async () => {
        
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64.awdawdawdawwd'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();

    });

  

    it('should not be able to submit a feedback without type', async () => {
        
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64.awdawdawdawwd'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without a comment', async () => {
        
        await expect(submitFeedback.execute({
            type: 'Bug',
            comment: '',
            screenshot: 'data:image/png;base64.awdawdawdawwd'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with invalid screenshot format', async () => {
        
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'wrong.png'
        })).rejects.toThrow();
    });
});