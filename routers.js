const router = require("express").Router();
const { DeviceController, DeviceLogController } = require("./controllers.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/api/device/open", DeviceController.checkPIN);
router.post("/api/device/change_pin", DeviceController.changePin);
router.post(
  "/api/devicelog/log",
  upload.single("image"),
  DeviceLogController.createLog
);
router.post("/api/devicelog/get_log", DeviceLogController.getLog);

module.exports = router;
