import express from "express";
import { SubmitFeedbackUseCase} from "./use-cases/submit-feedback-use-case";
import { PrismaFeedbacksRepository } from "./repositories/prisma-feedbacks-repository";
import { NodeMailerMailAdapter } from "./adapters/node-mailer/node-mailer-adapter";

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {

    const {type, comment, screenshot} = req.body;
    
    const mailAdapter = new NodeMailerMailAdapter();
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, mailAdapter)
    
    await submitFeedbackUseCase.execute({
        type, comment, screenshot
    });

    return res.status(201).send();
});

