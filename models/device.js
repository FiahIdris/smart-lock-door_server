"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Device.hasMany(models.DeviceLog, {
        foreignKey: "device_id",
        sourceKey: "id",
      });
    }
  }
  Device.init(
    {
      pin: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Device",
    }
  );
  return Device;
};
