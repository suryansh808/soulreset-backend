import express from "express";
import cors from "cors";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Soul Reset Backend is running 🚀");
});

app.use("/api", enquiryRoutes);
app.use("/api/booking", bookingRoutes);


export default app;
