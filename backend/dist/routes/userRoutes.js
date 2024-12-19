"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
const userController = new userController_1.default();
router.post('/signup', middleware_1.signupCheck, (req, res) => {
    userController.signup(req, res);
});
router.get('/signin', middleware_1.signinCheck, (req, res) => {
    userController.signin(req, res);
});
exports.default = router;