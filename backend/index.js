import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import experimentRoutes from "./routes/experimentRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/experiments", experimentRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
