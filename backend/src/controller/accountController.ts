import type{ Request, Response } from "express";
import { prismaClient } from "../lib/prisma.js";

export const GetBalance = async (req: Request , res : Response)=>{
   try {
     const UserID = req.userId ; 
    if(!UserID){
        return res.status(400).json({message:"Cant find userId in Reuqest object"}); 
    }
    const balance = await prismaClient.accountBalance.findUnique({
        where : {
            userId : parseInt(UserID) 
        },
    })
    if(!balance){
        return res.status(404).json({message: "Didn't find any balance for the user"})
    }
    return res.status(200).json({message: "Fetched Balance SucceFully", UserBalance : balance}) ; 
   } catch (error) {
    console.error({"Fetch Balance Error" : error}) ; 
    return res.status(500).json({message : "Internal Server Error"}); 
   }
}

export const TranferMoney = (req:Request , res: Response)=> {
    return res.status(200).json({message: "Transferred SucceFully"})
}