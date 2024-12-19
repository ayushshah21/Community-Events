import UserModel from '../models/userModel';
import { Request, Response } from 'express';

export default class UserController {
    
    signup = async(req: Request, res: Response) => {
        return res.status(200).json({msg: "Hello there"});
    }
}