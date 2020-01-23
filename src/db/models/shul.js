'use strict';
module.exports = (sequelize, DataTypes) => {
  var Shul = sequelize.define('Shul', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    body: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {});
  Shul.associate = function(models) {
    // associations can be defined here

  };
  return Shul;
};
