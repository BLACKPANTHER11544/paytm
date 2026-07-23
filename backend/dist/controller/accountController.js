import { prismaClient } from "../lib/prisma.js";
import { includes, z } from "zod";
export const GetBalance = async (req, res) => {
    try {
        const UserID = req.userId;
        if (!UserID) {
            return res.status(400).json({ message: "Cant find userId in Reuqest object" });
        }
        const balance = await prismaClient.accountBalance.findUnique({
            where: {
                userId: parseInt(UserID)
            },
        });
        if (!balance) {
            return res.status(404).json({ message: "Didn't find any balance for the user" });
        }
        return res.status(200).json({ message: "Fetched Balance SucceFully", UserBalance: balance });
    }
    catch (error) {
        console.error({ "Fetch Balance Error": error });
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const SendMoneySchemaZod = z.object({
    email: z.email(),
    SendingAmount: z.int().positive()
});
export const TranferMoney = async (req, res) => {
    try {
        const body = SendMoneySchemaZod.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({ message: body.error.format() });
        }
        const senderId = req.userId;
        if (!senderId) {
            return res.status(401).json({ message: "Unauthorized: Current user's Id not found" });
        }
        const { email: receiverEmail, SendingAmount } = body.data;
        if (!receiverEmail) {
            return res.status(404).json({ message: "Receiver's Email not found" });
        }
        const receiver = await prismaClient.user.findUnique({
            where: {
                email: receiverEmail
            }
        });
        if (!receiver) {
            return res.status(404).json({ message: "can't find reciver" });
        }
        if (parseInt(senderId) === receiver.id) {
            return res.status(400).json({ message: "You Can't send money to yourself" });
        }
        await prismaClient.$transaction(async (tx) => {
            const senderAccount = await tx.accountBalance.findUnique({
                where: {
                    userId: parseInt(senderId)
                }
            });
            if (!senderAccount || senderAccount.amount < SendingAmount) {
                throw new Error("Insufficient Balance");
            }
            await tx.accountBalance.update({
                where: {
                    userId: parseInt(senderId),
                },
                data: {
                    amount: {
                        decrement: SendingAmount
                    }
                }
            });
            await tx.accountBalance.update({
                where: {
                    userId: receiver.id
                },
                data: {
                    amount: {
                        increment: SendingAmount
                    }
                }
            }),
                await tx.transaction.create({
                    data: {
                        amount: SendingAmount,
                        fromUserId: parseInt(senderId),
                        toUserId: receiver.id
                    }
                });
        });
        return res.status(200).json({ message: "Money Transferred SuccessFully" });
    }
    catch (error) {
        console.error({ "Transfer Money Error": error });
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
//# sourceMappingURL=accountController.js.map