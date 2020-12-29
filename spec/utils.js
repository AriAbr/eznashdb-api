const Shul = require("../src/db/models").Shul;
const Room = require("../src/db/models").Room;


const createShul = ({
    name="Test Shul",
    nussach="Ashkenaz",
    denom="MO",
    country="US",
    region="New Jersey",
    city="Teaneck",
    femLead=0,
    kaddishWithMen=1,
    kaddishAlone=3,
    childcare=2,
    rooms=[getRoomData()],
}=getShulData()) => {
  return  Shul.create({
    name, nussach, denom, country, region, city, femLead, kaddishWithMen, kaddishAlone, childcare, rooms
  }, {
    include: {
      model: Room,
      as: "rooms"
    }
  })
}

const getShulData = ({
    name="Test Shul",
    nussach="Ashkenaz",
    denom="MO",
    country="US",
    region="New Jersey",
    city="Teaneck",
    femLead=0,
    kaddishWithMen=1,
    kaddishAlone=3,
    childcare=2,
    rooms=[getRoomData()],
  }={}) => {
  return {
    name, nussach, denom, country, region, city, femLead, kaddishWithMen, kaddishAlone, childcare, rooms
  }
}

const getRoomData = ({
    name="Test Room",
    size=2,
    isCentered=true,
    isSameFloorSide=true,
    isSameFloorBack=false,
    isSameFloorElevated=false,
    isSameFloorLevel=true,
    isBalconySide=false,
    isBalconyBack=false,
    isOnlyMen=false,
    isMixedSeating=false,
    visAudScore=3,
  }={}) => {
  return {
    name, 
    size,
    isCentered,
    isSameFloorSide,
    isSameFloorBack,
    isSameFloorElevated,
    isSameFloorLevel,
    isBalconySide,
    isBalconyBack,
    isOnlyMen,
    isMixedSeating,
    visAudScore,
  }
}

module.exports = { createShul, getShulData, getRoomData }
