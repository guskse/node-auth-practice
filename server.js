require("dotenv").config({ path: "./config.env" });

const express = require("express");
const app = express();

//middleware
app.use(express.json()); //permite utilizar json no req.body

app.use("/api/auth", require("./routes/auth"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
