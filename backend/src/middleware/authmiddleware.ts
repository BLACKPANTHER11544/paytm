import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verify } from "node:crypto";

const JWT_SECRET = process.env.JWT_SECRET || "aksfhbsdjhsdlgbasihbsadivuasbv"; 
if(!JWT_SECRET){
    throw new Error("JWT IS NOT DEFINED")
}
export const auth = (req:Request, res: Response , next : NextFunction)=>{
    const Authtoken = req.headers["token"]; 
    if(!Authtoken){
        return res.status(401).json({message : "Token not found"})
    }
    const tokenHeader = Array.isArray(Authtoken) ? Authtoken[0] : Authtoken;
    const ActualToken = tokenHeader?.split(" ")[1]; 
    
    try{
        const StringToken = Authtoken.toString()
       const VerifyToken = jwt.verify(StringToken, JWT_SECRET) as {id : number} ; 
       if(!VerifyToken.id){
        return res.status(401).json({message: "The id with which the token was signed is missing"}); 
       }
       req.userId = VerifyToken.id.toString() ; 
       next() ; 
    }catch(err){
      return res.status(403).json({ message: "Invalid or expired token" })
    }
    
}