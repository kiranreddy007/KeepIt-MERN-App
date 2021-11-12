const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const UserRoutes = require("./routes/UserRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleWare");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", UserRoutes);
app.use("/api/notes", noteRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server up at port ${PORT} `));
