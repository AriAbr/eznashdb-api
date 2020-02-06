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

}
