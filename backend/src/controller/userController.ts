import type {Request, Response } from "express" ; 
import { email, z } from "zod";
import {prismaClient} from "../lib/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWTsecret = process.env.JWT_SECRET || "askfjsbdvjhvbdkadvbad;kdh"
if (!JWTsecret) {
    throw new Error("JWT_SECRET is not defined")
}

const UserSignUPSchemaZod = z.object({
    name: z.string().min(5).max(20), 
    email : z.email(), 
    password : z.string().min(5).max(20), 
    PhoneNumber : z.string().min(10).max(10)
})

export const userSignUp = async(req: Request, res:Response)=>{
    const userBody = UserSignUPSchemaZod.safeParse(req.body); 
    if(!userBody.success){
       return res.status(500).json({message: userBody.error.format()}); 
    }
    const existingUserCheck = await prismaClient.user.findUnique({
        where : {
            email : userBody.data.email 
        }
    })
    if(existingUserCheck){
        return res.status(401).json({message: "Invalid credential / email already taken"})
    }
    const {name , email , password, PhoneNumber} = userBody.data ; 
    const salt = await bcrypt.genSalt(10) ; 
    const hashedPassword = await bcrypt.hash(password,salt); 
    const newUser = await prismaClient.user.create({
        data : {
            name : name , 
            email : email , 
            password : hashedPassword , 
            PhoneNumber : PhoneNumber, 
        }
    })
    return res.status(200).json({message : "user created succefully" , user : newUser}); 
}

const userSignINSchemaZod = z.object({
    email : z.email() , 
    password : z.string().min(5).max(20)
})

export const UserSignIN = async(req:Request , res :Response)=>{
   const userBody = userSignINSchemaZod.safeParse(req.body) ; 
   if(!userBody.success){
    console.log(userBody.error.format()) ; 
    return res.status(500).json({message : "Internal Server Error"}); 
   }
   const existingUserCheck = await prismaClient.user.findUnique({where : {email : userBody.data.email}}); 
   if(!existingUserCheck){
    return res.json({message: "Can't find any user with provided email"})
   }
   const ComparePasswords = await bcrypt.compare(userBody.data.password, existingUserCheck.password)
   if(!ComparePasswords){
    return res.status(400).json({message : "incorrect Password"}); 
   }
   const token = jwt.sign({id: existingUserCheck.id},JWTsecret, {expiresIn : "1d"})
   return res.status(200).json({message : "sign in successfull" , token : token })
}



