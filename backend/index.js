import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.route.js";
import taskRoutes from './routes/taskRoutes.js'; 
import dotenv from 'dotenv';

dotenv.config(); 

// Connect to the database
connectDB();

const app = express();

// Default middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173", // or your frontend URL on production
    credentials: true
}));

// API routes
app.use("/api/v1/user", userRoute);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

// ✅ Just export the app
export default app;
