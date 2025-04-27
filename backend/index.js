// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import {connectDB} from "./config/db.js";
// import userRoute from "./routes/user.route.js";
// // import courseRoute from "./routes/course.route.js";
// // import mediaRoute from "./routes/media.route.js";
// // import purchaseRoute from "./routes/purchaseCourse.route.js";
// // import courseProgressRoute from "./routes/courseProgress.route.js";

// dotenv.config({});

// // call database connection here
// connectDB();
// const app = express();

// const PORT = process.env.PORT || 8080;

// // default middleware
// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//   origin: process.env.FRONTEND_URL || "http://localhost:5173",
//   // origin: "http://localhost:5173",
//   credentials: true,
//   allowedHeaders: ["Content-Type", "Authorization"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }));

// // apis
// // app.use("/api/v1/media", mediaRoute);
// app.use("/api/v1/user", userRoute);
// // app.use("/api/v1/course", courseRoute);
// // app.use("/api/v1/purchase", purchaseRoute);
// // app.use("/api/v1/progress", courseProgressRoute);

// "http://localhost:8080/api/v1/user/register"

// app.get("/home",(_,res)=> {
//     res.status(200).json({
//         success:true,
//         message:"Hello i am comming from backend"
//     })
// })

// // Start the server
// const server = app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// // Handle the case when the port is in use
// server.on("error", (err) => {
//   if (err.code === "EADDRINUSE") {
//     console.log(`Port ${PORT} is already in use. Trying another port...`);

//     const fallbackServer = app.listen(0, () => {
//       const newPort = fallbackServer.address().port;
//       console.log(`Server running on new port ${newPort}`);
//     });
//   } else {
//     console.error("Server error:", err);
//   }
// });

// export default app;

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.route.js";
// import courseRoute from "./routes/course.route.js";
// import mediaRoute from "./routes/media.route.js";
// import purchaseRoute from "./routes/purchaseCourse.route.js";
// import courseProgressRoute from "./routes/courseProgress.route.js";
import dotenv from 'dotenv';
dotenv.config(); 

// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
 
// apis
// app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
// app.use("/api/v1/course", courseRoute);
// app.use("/api/v1/purchase", purchaseRoute);
// app.use("/api/v1/progress", courseProgressRoute);
 
 
// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  
  // Handle the case when the port is in use
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${PORT} is already in use. Trying another port...`);
  
      const fallbackServer = app.listen(0, () => {
        const newPort = fallbackServer.address().port;
        console.log(`Server running on new port ${newPort}`);
      });
    } else {
      console.error("Server error:", err);
    }
  });

export default app;




