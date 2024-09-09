import express from "express";
import loanOffersRouter from "./routes/loan-offers";

const app = express();

app.use(express.json());
app.use("/api/loan-offers", loanOffersRouter);

export default app;
