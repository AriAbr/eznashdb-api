'use strict';
const faker = require("faker");
const ccs = require('countrycitystatejson')

for(let i = 0 ; i < 10 ; i++){
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const shuls = [];

    var countries = ccs.getCountries();
    var country;
    var countryCode;
    var region;
    var city;
    var regions;
    var cities;

    for(let i = 0 ; i < 3 ; i++){
      region = "N/A";
      city = "N/A";
      regions = [];
      cities = [];

      country = countries[faker.random.number()%countries.length];
      countryCode = country.shortName;
      regions = ccs.getStatesByShort(countryCode).sort();
      if(regions.length > 0){
        region = regions[faker.random.number()%regions.length];
        cities = ccs.getCities(countryCode, region);
        if(cities.length > 0){
          city = cities[faker.random.number()%cities.length];
        }
      }

      shuls.push({
        name: faker.company.companyName(),
        nussach: faker.name.firstName(),
        denom: faker.name.firstName(),
        country: countryCode,
        region: region,
        city: city,
        femLead: faker.random.number()%3,
        kaddishWithMen: faker.random.number()%3,
        kaddishAlone: faker.random.number()%4,
        childcare: faker.random.number()%3,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    const addedShuls = await queryInterface.bulkInsert('Shuls', shuls, {returning: true});

    const rooms = [];

    for(let i = 0; i < addedShuls.length; i++){
      const shulId = addedShuls[i].id;
      const shulRoomCount = faker.random.number()%3 + 1;

      for(let j = 0; j < shulRoomCount; j++){
        var isSameFloor = faker.random.boolean();
        var hasBalcony = faker.random.boolean();
        var isNoWomSec = !isSameFloor && !hasBalcony;
        var isOnlyMen = isNoWomSec && faker.random.boolean();
        var isMixedSeating = isNoWomSec && !isOnlyMen;

        const room = {
          shulId: shulId,
          name: faker.company.companyName(),
          size: faker.random.number()%5,
          isCentered: isSameFloor && faker.random.boolean(),
          isSameFloorSide: isSameFloor && faker.random.boolean(),
          isSameFloorBack: isSameFloor && faker.random.boolean(),
          isSameFloorElevated: isSameFloor && faker.random.boolean(),
          isSameFloorLevel: isSameFloor && faker.random.boolean(),
          isBalconySide: hasBalcony && faker.random.boolean(),
          isBalconyBack: hasBalcony && faker.random.boolean(),
          isOnlyMen: isOnlyMen,
          isMixedSeating: isMixedSeating,
          visAudScore: faker.random.number()%6,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        rooms.push(room)
      }
    }

    const addedRooms = await queryInterface.bulkInsert('Rooms', rooms, {returning: true});
    return

  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   await queryInterface.bulkDelete("Shuls", null, {});
   await queryInterface.bulkDelete("Rooms", null, {});

  }
};
