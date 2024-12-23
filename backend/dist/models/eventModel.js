"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EventModel {
    static createEvent(newEventObj) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.event.create({
                data: newEventObj
            });
        });
    }
    static getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.event.findMany();
        });
    }
    static eventDetails(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            return yield prisma.event.findUnique({
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
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                        }
                    }
                }
            });
        });
    }
    static updateAttendees(_a) {
        return __awaiter(this, arguments, void 0, function* ({ eventId, userId }) {
            return yield prisma.event.update({
                where: { id: eventId },
                data: {
                    attendees: {
                        connect: { id: userId },
                    },
                },
            });
        });
    }
    static findEventsByCreator(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.event.findMany({
                where: {
                    creatorId: userId
                },
                orderBy: {
                    eventDate: 'asc'
                }
            });
        });
    }
    static findEventsByAttendee(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.event.findMany({
                where: {
                    attendees: {
                        some: {
                            id: userId
                        }
                    }
                },
                orderBy: {
                    eventDate: 'asc'
                }
            });
        });
    }
}
exports.default = EventModel;
