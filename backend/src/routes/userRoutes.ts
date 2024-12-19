import express from "express";
import UserController from "../controllers/userController";

const router = express.Router();
const userController = new UserController();

router.post('/signup', (req, res) => {
    userController.signup(req, res);
});


export default router;