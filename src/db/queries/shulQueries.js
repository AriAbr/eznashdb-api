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
