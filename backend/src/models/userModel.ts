import { PrismaClient } from "@prisma/client";
import { UserSignup } from "../types";

const prisma = new PrismaClient();

export default class UserModel {
    static async createUser({firstName, lastName, email}: UserSignup){
        return await prisma.user.create({
            data : {
                firstName,
                lastName,
                email
            }
        })
    }   
}