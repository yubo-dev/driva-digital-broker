import express from "express";
import cors from "cors";
import loanOffersRouter from "./routes/loan-offers";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST"],
  })
);

app.use(express.json());

app.use("/api/loan-offers", loanOffersRouter);

export default app;
