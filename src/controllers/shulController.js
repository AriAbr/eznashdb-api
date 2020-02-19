const Shul = require("../db/models").Shul;
const Room = require("../db/models").Room;
const shulQueries = require("../db/queries/shulQueries.js");
const roomQueries = require("../db/queries/roomQueries.js");
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

  getMapData(req, res, next){
    shulQueries.getAllShuls((err, shuls) => {
      if (err){
        res.send(err);
      } else {
        var mapData = {};

        for(let i = 0; i < shuls.length; i++){
          var currShul = shuls[i];
          var locationNameArr = [];
          if(currShul.city !== "N/A"){
            locationNameArr.push(currShul.city);
          }
          if(currShul.region !== "N/A" && currShul.country !== "IL"){
            locationNameArr.push(currShul.region);
          }
          if(currShul.country !== "N/A"){
            locationNameArr.push(currShul.country);
          }
          var locationName = locationNameArr.join(", ")

          if(!mapData[locationName]){
            mapData[locationName] = {
              shulCount: 0,
              city: currShul.city,
              region: currShul.region,
              countryCode: currShul.country,
            }
          }
          mapData[locationName].shulCount++;
          mapData[locationName].locationName = locationName;
        }
        res.send(mapData);
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
        hasErrored = false;
        if (err) {
          hasErrored = true
          res.status(500).send(err)
        } else {
          //add rooms
          rooms = [];
          req.body.rooms.map((room, key) => {
            room.shulId = shul.id;
            roomQueries.addRoom(room, (err, room) => {
              if(err) {
                hasErrored = true;
                res.status(500).send(err)
              } else {
                rooms.push(room.dataValues)
                if(key+1 === req.body.rooms.length && !hasErrored) { // is last room and no errors
                  //get shul with rooms and send it back
                  Shul.findOne({
                    where: {id: shul.id},
                    include: [
                      {model: Room, as: "rooms"}
                    ]
                  }).then((shulWithRooms) => {
                    res.send (shulWithRooms);
                  })
                }
              }
            })

          })
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
