import z from 'zod';
import express, { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import dotenv from 'dotenv'

dotenv.config({ path: "../../.env" });

const newEventSchema = z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    location: z.string(),
    creatorId: z.string(),
    eventDate: z.string().optional()
})

const validIdSchema = z.object({
    id: z.string()
})

async function newEventCheck(req: Request, res: Response, next: NextFunction){
    const validateBody = newEventSchema.safeParse(req.body);
    if(!validateBody.success){
        res.status(404).json({msg: "Invalid body"});
        return;
    }
    next();
}

async function validEventIdCheck(req: Request, res: Response, next: NextFunction){
    if(!req.params.id){
        res.status(404).json({msg: "Invalid input"});
        return;
    }
    const validateBody = validIdSchema.safeParse({id: req.params.id});
    if(!validateBody.success){
        res.status(404).json({msg: "Invalid event id"});
        return;
    }
    next();
}

async function validEventIdBodyCheck(req: Request, res: Response, next: NextFunction){
    if(!req.body.eventId){
        res.status(404).json({msg: "Invalid input"});
        return;
    }
    const validateBody = validIdSchema.safeParse({id: req.body.eventId});
    if(!validateBody.success){
        res.status(404).json({msg: "Invalid event id"});
        return;
    }
    next();
}

export {newEventCheck, validEventIdCheck, validEventIdBodyCheck}