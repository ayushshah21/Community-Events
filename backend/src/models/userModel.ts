import { PrismaClient } from "@prisma/client";
import { UserSignup } from "../types";

const prisma = new PrismaClient();

export default class UserModel {
    static async createUser(newUserObj: UserSignup){
        return await prisma.user.create({
            data : newUserObj
        })
    }   
    static async findUserEmail({email}: {email: string}){
        return await prisma.user.findUnique({
            where: {
                email
              },
        });
    }
    static async findUserId({id}: {id: string}){
        return await prisma.user.findUnique({
            where: {
                id
              },
        });
    }
}