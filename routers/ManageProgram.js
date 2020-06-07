const express = require("express");
const router = express.Router();
const File = require('../models/file');


router.post("/add", async (req, res) => {
  const file = new File(req.body);
  file.date = new Date();
  console.log(file);
  file
    .save()
    .then(() => {
      res.send(file);
    })
    .catch((e) => {
      res.status(401).send(e);
    });
});
router.get("/files", (req, res) => {
  File.find()
    .then((files) => res.json(files))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;