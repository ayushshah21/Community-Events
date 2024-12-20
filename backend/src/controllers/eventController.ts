import EventModel from '../models/eventModel';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config({ path: "../../.env" });


export default class UserController {
    createEvent = async (req: Request, res: Response) => {
        try {
            const newEvent = await EventModel.createEvent(req.body);
            return res.status(200).json({ newEvent });
        }
        catch (err) {
            return res.status(404).json({ msg: "Unable to create event" });
        }
    }

    getAllEvents = async (req: Request, res: Response) => {
        try {
            const allEvents = await EventModel.getAllEvents();
            allEvents.sort((a, b) => a.eventDate.valueOf() - b.eventDate.valueOf());
            return res.status(200).json(allEvents);

        }
        catch (err) {
            return res.status(404).json({ msg: "Error fetching events" });
        }
    }

    eventDetails = async (req: Request, res: Response) => {
        try {
            const eventDetails = await EventModel.eventDetails({ id: req.params.id });
            return res.status(200).json(eventDetails);
        }
        catch (err) {
            return res.status(404).json({ msg: "Error fetching event" });
        }
    }

    attendingEvent = async (req: Request, res: Response) => {
        try {
            const userId = req.id;
            const eventId = req.body.eventId;
            if (!userId) {
                res.status(404).json({ msg: "Invalid user token" });
                return;
            }
            const event = await EventModel.eventDetails({ id: eventId });
            if (!event) {
                return res.status(404).json({ msg: "Event does not exist" });
            }
            const updatedAttendees = await EventModel.updateAttendees({eventId, userId});
            const updatedEventDetails = await EventModel.eventDetails({id: eventId});
            return res.status(200).json({updatedEventDetails});

        }
        catch (err) {
            return res.status(404).json({ msg: "Error accepting event" });
        }
    }

    attendeesInfo = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            const event = await EventModel.eventDetails({ id });
            const attendeesInfo = event?.attendees;
            return res.status(200).json({attendeesInfo});
        }
        catch(err){
            return res.status(404).json({ msg: "Error fetching attendees info" });
        }
    }
}