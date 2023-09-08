require("dotenv").config({ path: "./config.env" });

//connect to the mongoDB atlas
const connectDB = require("./config/db");
connectDB();

const express = require("express");
const app = express();

//middleware
app.use(express.json()); //permite utilizar json no req.body

app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`logged error:  ${err}`);
  server.close(() => process.exit(1));
});