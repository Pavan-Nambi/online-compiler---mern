const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// ***********************database connectiom-----------------------------------------------------------
mongoose
  .connect("mongodb://localhost:27017/compiler", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("succesfully connected"))
  .catch((error) => {
    console.log("connection failed");
    console.log(error);
    process.exit(1);
  });
//********************************************************************************** */

const { newFile } = require("./files");
const { cpp } = require("./cpp");
const { py } = require("./py");
const { js } = require("./js");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.post("/run", async (req, res) => {
  const { lang, code } = req.body;
  try {
    const filepath = await newFile(lang, code);
    const output = await js(filepath);

    // console.log(req.body);
    console.log(output);
    return res.json({ filepath, output });
  } catch (err) {
    res.status(500).json({ err });
  }
});

app.listen(4000, () => {
  console.log("listening to port 4000");
});
