const Shul = require("../models").Shul;
const Room = require("../models").Room;
// const Authorizer = require("../policies/topic");


module.exports = {

  getAllShuls(callback){
    return Shul.findAll({
      include: [
        {model: Room, as: "rooms"}
      ]
    })
    .then((shuls) => {
      callback(null, shuls);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getShulsByLocation(locationData, callback){
    return Shul.findAll({
      where: {
        city: locationData.city,
        region: locationData.region,
        country: locationData.country,
      },
      include: [
        {model: Room, as: "rooms"}
      ]
    })
    .then((shuls) => {
      callback(null, shuls);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getShulsByParams(params, callback){
    var queryConditions = {};
    var yesNoInputs = ["femLead", "kaddishWithMen", "kaddishAlone", "childcare"];
    for(let i = 0; i < yesNoInputs.length; i++){
      var currKey = yesNoInputs[i];
      if(params[currKey]){
        var inputArr = params[currKey].split(" ").map(stringedNum=>parseInt(stringedNum));
        queryConditions[currKey] = inputArr;
      }
    }

    return Shul.findAll({
      where: queryConditions,
      include: [
        {model: Room, as: "rooms"}
      ]
    })
    .then((shuls) => {
      callback(null, shuls);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addShul(newShul, callback){
    return Shul.create({
      name: newShul.name,
      nussach: newShul.nussach,
      denom: newShul.denom,
      country: newShul.country,
      region: newShul.region,
      city: newShul.city,
      femLead: newShul.femLead,
      kaddishWithMen: newShul.kaddishWithMen,
      kaddishAlone: newShul.kaddishAlone,
      childcare: newShul.childcare,
    })
    .then((shul) => {
      callback(null, shul);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteShul(req, callback){
    const shulId = req.body.id

    return Shul.findOne({where: {id: shulId}}) // Shull.findById() is not working here for some reason
    .then((shul) => {

      // const authorized = new Authorizer(req.user, shul).destroy();

      // if(authorized){

        shul.destroy()
        .then((res) => {
          callback(null, shul);
        });
      // } else {
      //   req.flash("notice", "You are not authorized to do that.")
      //   callback(401);
      // }
    })
    .catch((err) => {
      callback(err);
    })
  },
}
