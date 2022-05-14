const { Device, DeviceLog } = require("./models");

class DeviceController {
  static async checkPIN(req, res, next) {
    const { device_id, pin } = req.body;
    try {
      const foundDevice = await Device.findOne({
        where: { id: device_id },
      });
      if (foundDevice && foundDevice.pin == pin)
        res.status(200).send({ success: true });
      else res.status(404).send({ success: false });
    } catch {
      res.status(500).send({ success: false });
    }
  }

  static async changePin(req, res, next) {
    const { device_id, pin, new_pin } = req.body;
    try {
      const foundDevice = await Device.findOne({
        where: { id: device_id },
      });
      if (foundDevice && foundDevice.pin == pin) {
        await Device.update({ pin: new_pin }, { where: { id: device_id } });
        res.status(200).send({ success: true });
      } else {
        res.status(404).send({ success: false });
      }
    } catch (err) {
      res.status(500).send({ success: false });
    }
  }
}

class DeviceLogController {
  static async createLog(req, res, next) {
    const { device_id, pin } = req.body;
    const picturePath = req.file.path;

    try {
      const foundDevice = await Device.findOne({
        where: { id: device_id },
      });
      if (foundDevice && foundDevice.pin == pin) {
        await DeviceLog.create({
          device_id,
          pic_path: picturePath,
          success: true,
        });
        res.status(200).send({ success: true });
      } else {
        await DeviceLog.create({
          device_id,
          pic_path: picturePath,
          success: false,
        });
        res.status(404).send({ success: false });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false });
    }
  }
  static async getLog(req, res, next) {
    const { device_id, pin } = req.body;
    try {
      const foundDevice = await Device.findOne({
        where: { id: device_id },
      });

      if (foundDevice && foundDevice.pin == pin) {
        const foundDeviceLog = await DeviceLog.findAll({
          where: { device_id },
        });

        res.status(200).send(foundDeviceLog);
      } else {
        res.status(404).send({ success: false });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false });
    }
  }
}

module.exports = { DeviceController, DeviceLogController };
