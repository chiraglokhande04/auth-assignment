import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./db/connectDB.js"
import authRoutes from "./routes/auth.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://auth-assignment-delta.vercel.app"  
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
)
app.use(express.json())

connectDB().then(() => {
  app.use("/api", authRoutes)

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
  })
})
