const Shul = require("../src/db/models").Shul;
const Room = require("../src/db/models").Room;

const getSampleShulData = () => {
  return { 
    name: "Test Shul",
    nussach: "Ashkenaz",
    denom: "MO",
    country: "US",
    region: "New Jersey",
    city: "Teaneck",
    femLead: 0,
    kaddishWithMen: 1,
    kaddishAlone: 3,
    childcare: 2,
    rooms: [getSampleRoomData()],
  }
}

const getSampleRoomData = () => {
  return {
    name: "Test Room",
    size: 2,
    isCentered: true,
    isSameFloorSide: true,
    isSameFloorBack: false,
    isSameFloorElevated: false,
    isSameFloorLevel: true,
    isBalconySide: false,
    isBalconyBack: false,
    isOnlyMen: false,
    isMixedSeating: false,
    visAudScore: 3,
  }
}

const createShul = (shulData) => {
  fullShulData = {...getSampleShulData(), ...shulData}
  return  Shul.create(fullShulData, {
    include: {
      model: Room,
      as: "rooms"
    }
  })
}

module.exports = { createShul, getSampleShulData, getSampleRoomData }
