import { email, z } from "zod";
import { prismaClient } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWTsecret = process.env.JWT_SECRET || "askfjsbdvjhvbdkadvbad;kdh";
if (!JWTsecret) {
    throw new Error("JWT_SECRET is not defined");
}
const UserSignUPSchemaZod = z.object({
    name: z.string().min(5).max(20),
    email: z.email(),
    password: z.string().min(5).max(20),
    PhoneNumber: z.string().min(10).max(10),
    /*we could have used zod for Accountbalance also, but here we
     are hardcoding the AccountBalance, and not getting balance from bank hence we
     won't be using zod for AccountBalance
    */
});
export const userSignUp = async (req, res) => {
    try {
        const userBody = UserSignUPSchemaZod.safeParse(req.body);
        if (!userBody.success) {
            return res.status(400).json({ message: userBody.error.format() });
        }
        const existingUserCheck = await prismaClient.user.findUnique({
            where: {
                email: userBody.data.email
            }
        });
        if (existingUserCheck) {
            return res.status(400).json({ message: "Invalid credential / email already taken" });
        }
        const { name, email, password, PhoneNumber } = userBody.data;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const Balance = 1 + Math.random() * 100000;
        const newUser = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                PhoneNumber: PhoneNumber,
                AccountBalance: {
                    create: {
                        amount: Balance
                    }
                }
            },
            include: {
                AccountBalance: true
            }
        });
        return res.status(200).json({ message: "user created succefully", user: newUser });
    }
    catch (error) {
        console.error({ "User SignUp Error": error });
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const userSignINSchemaZod = z.object({
    email: z.email(),
    password: z.string().min(5).max(20)
});
export const UserSignIN = async (req, res) => {
    try {
        const userBody = userSignINSchemaZod.safeParse(req.body);
        if (!userBody.success) {
            console.log(userBody.error.format());
            return res.status(401).json({ message: "Internal Server Error" });
        }
        const existingUserCheck = await prismaClient.user.findUnique({ where: { email: userBody.data.email } });
        if (!existingUserCheck) {
            return res.status(401).json({ message: "Can't find any user with provided email" });
        }
        const ComparePasswords = await bcrypt.compare(userBody.data.password, existingUserCheck.password);
        if (!ComparePasswords) {
            return res.status(400).json({ message: "incorrect Password" });
        }
        const token = jwt.sign({ id: existingUserCheck.id }, JWTsecret, { expiresIn: "1d" });
        // Remove the Token from Json, before final push 
        return res.status(200).json({ message: "sign in successfull", token: token });
    }
    catch (error) {
        console.error({ "User SignIn Error": error });
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const UserUpdateZodSchema = z.object({
    name: z.string().min(1).max(20).toLowerCase().trim().optional(),
    email: z.email().optional(),
    password: z.string().min(5).max(20).optional(),
    PhoneNumber: z.string().min(10).max(10).optional()
});
export const UserUpdate = async (req, res) => {
    try {
        const UserID = req.userId;
        if (!UserID) {
            return res.status(401).json({ message: "UserID not found / User not found" });
        }
        const UserBody = UserUpdateZodSchema.safeParse(req.body);
        if (!UserBody.success) {
            return res.status(400).json({ message: UserBody.error.format() });
        }
        const updatedBody = { ...UserBody.data };
        if (updatedBody.password) {
            const salt = await bcrypt.genSalt(10);
            updatedBody.password = await bcrypt.hash(updatedBody.password, salt);
        }
        if (Object.keys(updatedBody).length === 0) {
            return res.status(400).json({ message: "No changes in any of the fields were made" });
        }
        // Remove the password from UpdateChanges, before final push 
        const UpdateChanges = await prismaClient.user.update({
            where: {
                id: parseInt(UserID),
            },
            data: updatedBody,
            select: {
                id: true,
                name: true,
                email: true,
                PhoneNumber: true,
                // password : true 
            }
        });
        return res.status(200).json({ message: "Profile Updated SuccessFully", Updated_user: UpdateChanges });
    }
    catch (error) {
        console.error({ "UpdateUser Error": error });
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const DeleteUser = async (req, res) => {
    try {
        const UserID = req.userId;
        if (!UserID) {
            return res.status(401).json({ message: "UserID not found / User not found" });
        }
        const DeletedUser = await prismaClient.user.delete({
            where: {
                id: parseInt(UserID)
            }
        });
        // Remove the DeletedUser from json, before final push 
        return res.status(200).json({
            message: "User deleted SucceFully",
            // DeletedUser
        });
    }
    catch (error) {
        console.error({ "Deleted user error": error });
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
            return res.status(404).json({ message: "User not found or already deleted" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const GetUserDetail = async (req, res) => {
    try {
        const UserId = req.userId;
        if (!UserId) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        const UserDetail = await prismaClient.user.findUnique({
            where: {
                id: parseInt(UserId)
            },
            select: {
                name: true,
                email: true,
                PhoneNumber: true,
                // password : true
            }
        });
        if (!UserDetail) {
            return res.status(404).json({ message: "User Not Found" });
        }
        return res.status(200).json({ message: "Got User Details", user: UserDetail });
    }
    catch (error) {
        console.error({ "User Details Error": error });
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const FindUser = async (req, res) => {
    try {
        const UserName = req.query.user;
        if (!UserName) {
            return res.status(404).json({ message: "User with such UserName was not Found" });
        }
        const FoundUserArray = await prismaClient.user.findMany({
            where: {
                name: {
                    contains: UserName.toString(),
                    mode: "insensitive"
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                PhoneNumber: true,
                // AccountBalance : true
            }
        });
        if (!FoundUserArray || FoundUserArray.length <= 0) {
            return res.status(404).json({ message: "Didn't found such username in DB" });
        }
        return res.status(200).json({ message: "Found an array of users", userArray: FoundUserArray });
    }
    catch (error) {
        console.error({ "Find User Error": error });
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const FindAllUser = async (req, res) => {
    try {
        const UserId = req.userId;
        if (!UserId) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        const SendRequest = await prismaClient.user.findMany();
        if (!SendRequest) {
            console.log("Didn't find inthing in db");
            return res.status(404).json({ message: "Didn't find inthing in db" });
        }
        return res.status(200).json({ message: "SucessFully Fetched all users", AllUser: SendRequest });
    }
    catch (error) {
        console.error({ "Can't get all users": error });
        res.status(500).json({ message: "Internal Server Error" });
    }
};
//# sourceMappingURL=userController.js.map