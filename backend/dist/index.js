import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import accoutRoutes from "./routes/accountRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
const port = process.env.PORT_NUMBER || 3000;
app.get("/", (req, res) => {
    res.json({ message: `HI from ${port}` });
});
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/account", accoutRoutes);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map