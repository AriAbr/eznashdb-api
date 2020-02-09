const Shul = require("../models").Shul;
// const Authorizer = require("../policies/topic");


module.exports = {

  getAllShuls(callback){
    return Shul.findAll()
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

}
