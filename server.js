/* eslint-disable no-undef */
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")
const authRoutes = require("./src/routes/auth")
const employeeRoutes = require("./src/routes/employee")

const app = express()

// CONNECT TO DB
mongoose
	.connect(process.env.DB_CONNECT_URI)
	.then(() => {
		console.log("Connected to MongoDB...")
	})
	.catch((err) => console.log("Could not connect to MongoDB...", err))

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// ROUTES
app.get("/api/healthz", (req, res) =>
	res.status(200).json({ message: "Server running" })
)

app.use("/api/user", authRoutes)
app.use("/api/emp", employeeRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}...`)
})
