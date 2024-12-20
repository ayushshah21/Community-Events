import express from "express";
import EventController from "../controllers/eventController";
import { verifyToken } from "../middleware/userMiddleware";
import { newEventCheck, validEventIdBodyCheck, validEventIdCheck } from "../middleware/eventMiddleware";

const router = express.Router();
const eventController = new EventController();

router.get('/:id', verifyToken, validEventIdCheck, (req, res) => {
    eventController.eventDetails(req, res);
});

router.get('/', verifyToken, (req, res) => {
    eventController.getAllEvents(req, res);
});

router.post('/create', verifyToken, newEventCheck, (req, res) => {
    eventController.createEvent(req, res);
});
router.post('/attending', verifyToken, validEventIdBodyCheck, (req, res) => {
   eventController.attendingEvent(req, res);
});

router.get("/attendees/:id", verifyToken, validEventIdCheck, (req, res) => {
    eventController.attendeesInfo(req, res);
})



export default router;