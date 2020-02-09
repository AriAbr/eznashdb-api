const express = require("express");
const router = express.Router();
// const validation = require("./validation");

const shulController = require("../controllers/shulController");

router.get("/getAll", shulController.getAll);

router.post("/create", shulController.create);

module.exports = router;
