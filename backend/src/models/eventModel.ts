import { PrismaClient } from "@prisma/client";
import { CreateEvent } from "../types";

const prisma = new PrismaClient();

export default class EventModel {
    static async createEvent(newEventObj: CreateEvent) {
        return await prisma.event.create({
            data: newEventObj
        })
    }
    static async getAllEvents() {
        return await prisma.event.findMany();
    }
    static async eventDetails({ id }: { id: string }) {
        return await prisma.event.findUnique({
            where: {
                id
            },
            include: {
                creator: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                },
                attendees: {
                    select : {
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                }
            }

        })
    }

    static async updateAttendees({ eventId, userId }: { eventId: string, userId: string }) {
        return await prisma.event.update({
            where: { id: eventId },
            data: {
                attendees: {
                    connect: { id: userId },
                },
            },
        });
    }
}