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

  create(req, res, next){
    // const authorized = new Authorizer(req.user).create();

    // if(authorized) {
      let newShul = {
        name: req.body.name,
        nussach: req.body.nussach,
        denom: req.body.denom,
        country: req.body.country,
        region: req.body.region,
        city: req.body.city,
        femLead: req.body.femLead,
        kaddishWithMen: req.body.kaddishWithMen,
        kaddishAlone: req.body.kaddishAlone,
        childcare: req.body.childcare,
      };
      shulQueries.addShul(newShul, (err, shul) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.send (shul);
        }
      });
    // } else {
    //   req.flash("notice", "You are not authorized to do that.");
    //   res.redirect("/shuls");
    // }
  },

  destroy (req, res, next) {
    shulQueries.deleteShul(req, (err, shul) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.send (shul);
      }
    });
  },

}
