import z from 'zod';
import express, {Request, Response, NextFunction} from 'express';

const UserSignupSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string()
})

function signupCheck(req: Request, res: Response, next: NextFunction){

}

export {signupCheck}