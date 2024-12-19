import express from "express";
import UserController from "../controllers/userController";
import { signinCheck, signupCheck } from "../middleware/middleware";

const router = express.Router();
const userController = new UserController();

router.post('/signup', signupCheck, (req, res) => {
    userController.signup(req, res);
});
router.get('/signin', signinCheck, (req, res) => {
    userController.signin(req, res);
});


export default router;