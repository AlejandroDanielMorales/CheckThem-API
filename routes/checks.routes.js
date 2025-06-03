const express = require("express");
const router = express.Router();
const checksController = require("../controllers/checks.controller");

router.post("/checks", checksController.createCheck);
router.get("/checks", checksController.getAllChecks);
router.get("/checks/:id", checksController.getCheckById);
router.put("/checks/:id", checksController.updateCheck);
router.delete("/checks/:id", checksController.deleteCheck);

module.exports = router;
