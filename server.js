require("dotenv").config({ path: "./config.env" });
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const express = require("express");

//connect to the mongoDB atlas
connectDB();


const app = express();

//middleware
app.use(express.json()); //permite utilizar json no req.body

app.use("/api/auth", require("./routes/auth"));




//error handler (should be last piece of middleware)
app.use(errorHandler);



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`logged error:  ${err}`);
  server.close(() => process.exit(1));
});
