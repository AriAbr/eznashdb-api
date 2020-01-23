'use strict';
module.exports = (sequelize, DataTypes) => {
  var Shul = sequelize.define('Shul', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nussach: {
      allowNull: false,
      type: DataTypes.STRING
    },
    denom: {
      allowNull: false,
      type: DataTypes.STRING
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING
    },
    region: {
      allowNull: false,
      type: DataTypes.STRING
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING
    },
    femLead: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    kaddishWithMen: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    kaddishAlone: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    childcare: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Shul.associate = function(models) {
    // associations can be defined here

  };
  return Shul;
};
