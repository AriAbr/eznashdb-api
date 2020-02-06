'use strict';
module.exports = (sequelize, DataTypes) => {
  var Room = sequelize.define('Room', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    size: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    visAudScore: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    isCentered: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    isSameFloorSide: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    isSameFloorBack: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    isSameFloorElevated: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    isSameFloorLevel: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    isBalconySide: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    isBalconyBack: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    isOnlyMen: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    isMixedSeating: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
  }, {});
  Room.associate = function(models) {
    // associations can be defined here

  };
  return Room;
};
