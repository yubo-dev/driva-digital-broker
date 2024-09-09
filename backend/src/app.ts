import express from "express";
import loanOffersRouter from "./routes/loanOffers";

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/api/loan-offers", loanOffersRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
