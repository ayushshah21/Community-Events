import express from "express";
import UserController from "../controllers/userController";
import { signinCheck, signupCheck } from "../middleware/userMiddleware";
import { verifyToken } from "../middleware/userMiddleware";

const router = express.Router();
const userController = new UserController();

router.post('/signup', signupCheck, (req, res) => {
    userController.signup(req, res);
});
router.get('/signin', signinCheck, (req, res) => {
    userController.signin(req, res);
});
router.get('/', verifyToken, (req, res) => {
    userController.getInfo(req, res);
});


export default router;