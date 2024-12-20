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
exports.newEventCheck = newEventCheck;
exports.validEventIdCheck = validEventIdCheck;
exports.validEventIdBodyCheck = validEventIdBodyCheck;
const zod_1 = __importDefault(require("zod"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../../.env" });
const newEventSchema = zod_1.default.object({
    name: zod_1.default.string(),
    description: zod_1.default.string(),
    location: zod_1.default.string(),
    creatorId: zod_1.default.string(),
    eventDate: zod_1.default.string().optional()
});
const validIdSchema = zod_1.default.object({
    id: zod_1.default.string()
});
function newEventCheck(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateBody = newEventSchema.safeParse(req.body);
        if (!validateBody.success) {
            res.status(404).json({ msg: "Invalid body" });
            return;
        }
        next();
    });
}
function validEventIdCheck(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.params.id) {
            res.status(404).json({ msg: "Invalid input" });
            return;
        }
        const validateBody = validIdSchema.safeParse({ id: req.params.id });
        if (!validateBody.success) {
            res.status(404).json({ msg: "Invalid event id" });
            return;
        }
        next();
    });
}
function validEventIdBodyCheck(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.eventId) {
            res.status(404).json({ msg: "Invalid input" });
            return;
        }
        const validateBody = validIdSchema.safeParse({ id: req.body.eventId });
        if (!validateBody.success) {
            res.status(404).json({ msg: "Invalid event id" });
            return;
        }
        next();
    });
}
