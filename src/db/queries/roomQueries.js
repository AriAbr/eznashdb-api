const Room = require("../models").Room;
// const Authorizer = require("../policies/topic");


module.exports = {

  addRoom(newRoom, callback){
    return Room.create({
      shulId: newRoom.shulId,
      name: newRoom.name,
      size: newRoom.size,
      isCentered: newRoom.isCentered,
      isSameFloorSide: newRoom.isSameFloorSide,
      isSameFloorBack: newRoom.isSameFloorBack,
      isSameFloorElevated: newRoom.isSameFloorElevated,
      isSameFloorLevel: newRoom.isSameFloorLevel,
      isBalconySide: newRoom.isBalconySide,
      isBalconyBack: newRoom.isBalconyBack,
      isOnlyMen: newRoom.isOnlyMen,
      isMixedSeating: newRoom.isMixedSeating,
      visAudScore: newRoom.visAudScore,
    })
    .then((room) => {
      callback(null, room);
    })
    .catch((err) => {
      callback(err);
    })
  },

}
