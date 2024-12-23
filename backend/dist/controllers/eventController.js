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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventModel_1 = __importDefault(require("../models/eventModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../../.env" });
class UserController {
    constructor() {
        this.createEvent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newEvent = yield eventModel_1.default.createEvent(req.body);
                return res.status(200).json({ newEvent });
            }
            catch (err) {
                return res.status(404).json({ msg: "Unable to create event" });
            }
        });
        this.getAllEvents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allEvents = yield eventModel_1.default.getAllEvents();
                allEvents.sort((a, b) => a.eventDate.valueOf() - b.eventDate.valueOf());
                return res.status(200).json(allEvents);
            }
            catch (err) {
                return res.status(404).json({ msg: "Error fetching events" });
            }
        });
        this.eventDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const eventDetails = yield eventModel_1.default.eventDetails({ id: req.params.id });
                return res.status(200).json(eventDetails);
            }
            catch (err) {
                return res.status(404).json({ msg: "Error fetching event" });
            }
        });
        this.attendingEvent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.id;
                const eventId = req.body.eventId;
                if (!userId) {
                    res.status(404).json({ msg: "Invalid user token" });
                    return;
                }
                const event = yield eventModel_1.default.eventDetails({ id: eventId });
                if (!event) {
                    return res.status(404).json({ msg: "Event does not exist" });
                }
                const updatedAttendees = yield eventModel_1.default.updateAttendees({ eventId, userId });
                const updatedEventDetails = yield eventModel_1.default.eventDetails({ id: eventId });
                return res.status(200).json({ updatedEventDetails });
            }
            catch (err) {
                return res.status(404).json({ msg: "Error accepting event" });
            }
        });
        this.attendeesInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const event = yield eventModel_1.default.eventDetails({ id });
                const attendeesInfo = event === null || event === void 0 ? void 0 : event.attendees;
                return res.status(200).json({ attendeesInfo });
            }
            catch (err) {
                return res.status(404).json({ msg: "Error fetching attendees info" });
            }
        });
        this.getUserCreatedEvents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const events = yield eventModel_1.default.findEventsByCreator(userId);
                return res.status(200).json(events);
            }
            catch (err) {
                return res.status(404).json({ msg: "Error fetching created events" });
            }
        });
        this.getUserAttendingEvents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const events = yield eventModel_1.default.findEventsByAttendee(userId);
                return res.status(200).json(events);
            }
            catch (err) {
                return res.status(404).json({ msg: "Error fetching attending events" });
            }
        });
    }
}
exports.default = UserController;
