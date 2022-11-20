import express from "express";
// import authRouter from "./routes/auth.js";
// import postsRouter from "./routes/posts.js";
import { authRouter, postsRouter } from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/posts", postsRouter);

mongoose
    .connect(
        "mongodb+srv://mern:mern@cluster0.2kjuvlo.mongodb.net/full-stack-blog?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("good connect");
    })
    .catch(err => {
        console.log(err);
    });

app.listen(PORT, err => {
    if (err) {
        return console.log(err);
    }
    console.log("great");
});
