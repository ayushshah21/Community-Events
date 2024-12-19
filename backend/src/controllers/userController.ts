import UserModel from '../models/userModel';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config({ path: "../../.env" });


export default class UserController {
    signup = async (req: Request, res: Response) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUserObj = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword
            };
            const newUser = await UserModel.createUser(newUserObj);
            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET || "");
            return res.status(200).json({ user: { id: newUser.id, email: newUser.email, firstName: newUser.firstName, lastName: newUser.lastName }, token });
        }
        catch (err) {
            return res.status(404).json({ msg: "Error creating user" });
        }
    }
    signin = async (req: Request, res: Response) => {
        try {
            if (req.id) {
                const id = req.id;
                const userExists = await UserModel.findUserId({ id });
                if (!userExists) {
                    return res.status(404).json({ msg: "Invalid token" });
                }
                return res.status(200).json({user: { id: userExists.id, email: userExists.email, firstName: userExists.firstName, lastName: userExists.lastName },})
            }
            const email = req.headers.username;
            const password = req.headers.password;
            if (typeof email !== 'string' || typeof password !== 'string') return res.status(404).json({ msg: "Error signing in" });
            const userExists = await UserModel.findUserEmail({ email });
            if(!userExists) return res.status(404).json({ msg: "User does not exist" });

            const passwordMatch = await bcrypt.compare(password, userExists.password);
            if(!passwordMatch) return res.status(404).json({ msg: "Invalid password" });

            const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET || "");
            return res.status(200).json({user : { id: userExists.id, email: userExists.email, firstName: userExists.firstName, lastName: userExists.lastName }, token })
        }
        catch (err) {
            return res.status(404).json({ msg: "Error Signing in" });
        }
    }
}