"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DeviceLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DeviceLog.belongsTo(models.Device, {
        foreignKey: "device_id",
        targetKey: "id",
      });
    }
  }
  DeviceLog.init(
    {
      device_id: DataTypes.INTEGER,
      pic_path: DataTypes.STRING,
      success: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "DeviceLog",
    }
  );
  return DeviceLog;
};
