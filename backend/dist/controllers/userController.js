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
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../../.env" });
class UserController {
    constructor() {
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
                const newUserObj = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPassword
                };
                const newUser = yield userModel_1.default.createUser(newUserObj);
                const token = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_SECRET || "");
                return res.status(200).json({ user: { id: newUser.id, email: newUser.email, firstName: newUser.firstName, lastName: newUser.lastName }, token });
            }
            catch (err) {
                return res.status(404).json({ msg: "Error creating user" });
            }
        });
        this.signin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.id) {
                    const id = req.id;
                    const userExists = yield userModel_1.default.findUserId({ id });
                    if (!userExists) {
                        return res.status(404).json({ msg: "Invalid token" });
                    }
                    return res.status(200).json({ user: { id: userExists.id, email: userExists.email, firstName: userExists.firstName, lastName: userExists.lastName }, });
                }
                const email = req.headers.username;
                const password = req.headers.password;
                if (typeof email !== 'string' || typeof password !== 'string')
                    return res.status(404).json({ msg: "Error signing in" });
                const userExists = yield userModel_1.default.findUserEmail({ email });
                if (!userExists)
                    return res.status(404).json({ msg: "User does not exist" });
                const passwordMatch = yield bcrypt_1.default.compare(password, userExists.password);
                if (!passwordMatch)
                    return res.status(404).json({ msg: "Invalid password" });
                const token = jsonwebtoken_1.default.sign({ id: userExists.id }, process.env.JWT_SECRET || "");
                return res.status(200).json({ user: { id: userExists.id, email: userExists.email, firstName: userExists.firstName, lastName: userExists.lastName }, token });
            }
            catch (err) {
                return res.status(404).json({ msg: "Error Signing in" });
            }
        });
        this.getInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.id;
            try {
                const id = String(req.id);
                const userExists = yield userModel_1.default.findUserId({ id });
                if (!userExists) {
                    return res.status(404).json({ msg: "Invalid token" });
                }
                return res.status(200).json({ user: { id: userExists.id, email: userExists.email, firstName: userExists.firstName, lastName: userExists.lastName }, });
            }
            catch (err) {
                return res.status(404).json({ msg: "Error fetching user" });
            }
        });
    }
}
exports.default = UserController;
