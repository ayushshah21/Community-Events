"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = __importDefault(require("../controllers/eventController"));
const userMiddleware_1 = require("../middleware/userMiddleware");
const eventMiddleware_1 = require("../middleware/eventMiddleware");
const router = express_1.default.Router();
const eventController = new eventController_1.default();
router.get('/:id', userMiddleware_1.verifyToken, eventMiddleware_1.validEventIdCheck, (req, res) => {
    eventController.eventDetails(req, res);
});
router.get('/', userMiddleware_1.verifyToken, (req, res) => {
    eventController.getAllEvents(req, res);
});
router.post('/create', userMiddleware_1.verifyToken, eventMiddleware_1.newEventCheck, (req, res) => {
    eventController.createEvent(req, res);
});
router.post('/attending', userMiddleware_1.verifyToken, eventMiddleware_1.validEventIdBodyCheck, (req, res) => {
    eventController.attendingEvent(req, res);
});
router.get("/attendees/:id", userMiddleware_1.verifyToken, eventMiddleware_1.validEventIdCheck, (req, res) => {
    eventController.attendeesInfo(req, res);
});
router.get('/created/:userId', userMiddleware_1.verifyToken, (req, res) => {
    eventController.getUserCreatedEvents(req, res);
});
router.get('/attending/:userId', userMiddleware_1.verifyToken, (req, res) => {
    eventController.getUserAttendingEvents(req, res);
});
exports.default = router;
