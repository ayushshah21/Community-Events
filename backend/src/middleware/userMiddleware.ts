import z from 'zod';
import express, { Request, Response, NextFunction } from 'express';
import UserModel from '../models/userModel';
import jwt, { JwtPayload } from 'jsonwebtoken';

import dotenv from 'dotenv'

dotenv.config({ path: "../../.env" });


declare global {
    namespace Express {
        interface Request {
            id?: string;
        }
    }
}


const userSignupSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(3)
})
const userSigninSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

async function signupCheck(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const validateSchema = userSignupSchema.safeParse(body);
    if (!validateSchema.success) {
        res.status(404).json({ msg: "Invalid user info" });
        return;
    }
    const userExists = await UserModel.findUserEmail({ email: body.email });
    if (userExists) {
        res.status(404).json({ msg: "User already exists, please sign in" });
        return;
    }
    next();

}

async function signinCheck(req: Request, res: Response, next: NextFunction) {
    const tokenArr = req.headers.authorization;
    const email = req.headers.username;
    const password = req.headers.password;
    if (tokenArr && (!email && !password)) {
        const token = tokenArr?.split(" ")[1];
        if (tokenArr?.split(" ")[0] !== 'Bearer') {
            res.status(404).json({ msg: "Invalid user info" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
        if(!decoded){
            res.status(404).json({ msg: "Invalid user info" });
            return;
        }
        req.id = decoded.id;
        next();
    }
    const validateSchema = userSigninSchema.safeParse({ email, password });
    if (typeof email !== 'string') return;
    if (!validateSchema.success) {
        res.status(404).json({ msg: "Invalid user info" });
        return;
    }
    const userExists = await UserModel.findUserEmail({ email });
    if (!userExists) {
        res.status(404).json({ msg: "User does not exist. Please sign up" });
        return;
    }
    next();

}

async function verifyToken(req: Request, res: Response, next: NextFunction){
    const tokenArr = req.headers.authorization;
    if (tokenArr) {
        const token = tokenArr?.split(" ")[1];
        if (tokenArr?.split(" ")[0] !== 'Bearer') {
            res.status(404).json({ msg: "Invalid token" });
            return;
        }
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
            req.id = decoded.id;
            next();
        }
        catch(err){
            res.status(404).json({ msg: "Invalid user token" });
            return;
        }
    }
}



export { signupCheck, signinCheck, verifyToken }