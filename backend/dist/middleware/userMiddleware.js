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
exports.signupCheck = signupCheck;
exports.signinCheck = signinCheck;
exports.verifyToken = verifyToken;
const zod_1 = __importDefault(require("zod"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../../.env" });
const userSignupSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(1),
    lastName: zod_1.default.string().min(1),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(3)
});
const userSigninSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
function signupCheck(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const validateSchema = userSignupSchema.safeParse(body);
        if (!validateSchema.success) {
            res.status(404).json({ msg: "Invalid user info" });
            return;
        }
        const userExists = yield userModel_1.default.findUserEmail({ email: body.email });
        if (userExists) {
            res.status(404).json({ msg: "User already exists, please sign in" });
            return;
        }
        next();
    });
}
function signinCheck(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenArr = req.headers.authorization;
        const email = req.headers.username;
        const password = req.headers.password;
        if (tokenArr && (!email && !password)) {
            const token = tokenArr === null || tokenArr === void 0 ? void 0 : tokenArr.split(" ")[1];
            if ((tokenArr === null || tokenArr === void 0 ? void 0 : tokenArr.split(" ")[0]) !== 'Bearer') {
                res.status(404).json({ msg: "Invalid user info" });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
            if (!decoded) {
                res.status(404).json({ msg: "Invalid user info" });
                return;
            }
            req.id = decoded.id;
            next();
        }
        const validateSchema = userSigninSchema.safeParse({ email, password });
        if (typeof email !== 'string')
            return;
        if (!validateSchema.success) {
            res.status(404).json({ msg: "Invalid user info" });
            return;
        }
        const userExists = yield userModel_1.default.findUserEmail({ email });
        if (!userExists) {
            res.status(404).json({ msg: "User does not exist. Please sign up" });
            return;
        }
        next();
    });
}
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenArr = req.headers.authorization;
        if (tokenArr) {
            const token = tokenArr === null || tokenArr === void 0 ? void 0 : tokenArr.split(" ")[1];
            if ((tokenArr === null || tokenArr === void 0 ? void 0 : tokenArr.split(" ")[0]) !== 'Bearer') {
                res.status(404).json({ msg: "Invalid token" });
                return;
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
                req.id = decoded.id;
                next();
            }
            catch (err) {
                res.status(404).json({ msg: "Invalid user token" });
                return;
            }
        }
    });
}
