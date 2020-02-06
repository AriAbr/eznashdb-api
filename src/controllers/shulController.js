const shulQueries = require("../db/queries/shulQueries.js");
// const Authorizer = require("../policies/shul");


module.exports = {

  getAll(req, res, next){
    shulQueries.getAllShuls((err, shuls) => {
      if (err){
        res.send(err);
      } else {
        res.send(shuls);
      }
    })
  },

}
