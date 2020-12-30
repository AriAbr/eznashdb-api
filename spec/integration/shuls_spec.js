const request = require("request");
var http = require('http');
const server = require('../../bin/www');
const base = ("http://localhost:9000/shuls/");

const sequelize = require("../../src/db/models/index").sequelize;
const Shul = require("../../src/db/models").Shul;
const Room = require("../../src/db/models").Room;

const {createShul, getSampleShulData, getSampleRoomData} = require("../utils");

describe("routes : shuls", () => {

  beforeEach((done) => {
    sequelize.sync({force : true}).then((res) => {
      createShul().then((shul) => {
        this.shul = shul;
        this.room = shul.rooms[0]
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });
  });

  describe("user performing CRUD actions for Shul", () => {

    describe("GET /shuls/getAll", () => {

      it("should return a status code of 200 and all shuls", (done) => {
        request.get(`${base}getAll`, (err, res, body) => {
          var shuls = JSON.parse(res.body)
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(shuls[0].name).toBe("Test Shul");
          done();
        });
      });

    });

    describe("POST /shuls/create", () => {

      const options = {
        url: `${base}create`,
        json: true,
        method: 'post',
        body: {
          ...getSampleShulData(),
          name: "Created Shul 1",
          rooms: [{...getSampleRoomData(), name: "Created Room 1"}]
        },
      };

      it("should return a status code of 200 and create a new shul", (done) => {
        request(options,

          (err, res, body) => {
            Shul.findOne({
              where: {name: "Created Shul 1"},
              include: [
                {model: Room, as: "rooms"}
              ]
            })
            .then((shul) =>{
              expect(res.statusCode).toBe(200);
              expect(shul.name).toBe("Created Shul 1");
              expect(shul.city).toBe("Teaneck");
              expect(shul.rooms[0].name).toBe("Created Room 1");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            })
          }
        );
      });

      it("should not create a new shul with missing fields", (done) => {

        var shulData = {...getSampleShulData(), name: "Created Shul 2"}
        delete shulData.childcare
        const options = {
          url: `${base}create`,
          form: shulData,
        };

        request.post(options, (err, res, body) => {
          Shul.findOne({where: {name: "Created Shul 2"}})
          .then((shul) => {
            expect(shul).toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          })
        })
      })

      it("should not create a new room with missing fields", (done) => {
        var roomData = {...getSampleRoomData(), name: "Room with no vis/aud" }
        delete roomData.visAudScore
        const options = {
          url: `${base}create`,
          json: true,
          method: 'post',
          body: {
            ...getSampleShulData(), 
            name: "Created Shul 1",
            rooms: [roomData]
          },
        };

        request(options,
          (err, res, body) => {

            Room.findOne({where: {name: "Room with no vis/aud"}})
            .then((room) => {
              expect(room).toBeNull();
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            })
          })
      })

      // it("should not create a new shul that fails validation", (done) => {
      //   const options = {
      //     url: `${base}create`,
      //     form: {
      //       title: "a",
      //       description: "b"
      //     }
      //   };

      //   request.post(options,
      //     (err, res, body) => {

      //       Shul.findOne({where: {title: "a"}})
      //       .then((shul) => {
      //         expect(shul).toBeNull();
      //         done();
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //         done();
      //       })
      //     })
      // })
    });

    describe("POST /shuls/destroy", () => {

      it("should delete the topic with the associated ID", (done) => {
        const id = this.shul.id;
        const options = {
          url: `${base}destroy`,
          form: {
            id: id,
          }
        };

        Shul.findAll()
        .then((shuls) => {
          const shulCountBeforeDelete = shuls.length;
          expect(shulCountBeforeDelete).toBe(1);
          request.post(options, (err, res, body) => {
            expect(JSON.parse(res.body).id).toBe(id);
            Shul.findAll()
            .then((shuls) => {
              expect(err).toBeNull();
              expect(shuls.length).toBe(shulCountBeforeDelete - 1);
              done();
            })
          })
        })
      });
    });

  });

  describe("user performing map actions", () => {

    // beforeEach((done) => { //mock authenticate as admin user
    //   User.create({
    //     email: "admin@example.com",
    //     password: "123456",
    //     role: "admin"
    //   })
    //   .then((user) => {
    //     request.get({ //mock authentication
    //       url: "http://localhost:3000/auth/fake",
    //       form: {
    //         role: user.role,
    //         userId: user.id,
    //         email: user.email
    //       }
    //     },
    //       (err, res, body) => {
    //         done();
    //       }
    //     );
    //   });
    // });

    describe("GET /shuls/getMapData", () => {

      it("should return a status code of 200 and map data for all shuls", (done) => {
        request.get(`${base}getMapData`, (err, res, body) => {
          var mapData = JSON.parse(res.body)
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(mapData["Teaneck, New Jersey, US"].shulCount).toBe(1);
          done();
        });
      });

    });

    describe("POST /shuls/searchByLocation", () => {

      it("should return a status code of 200 and all shuls in the location", (done) => {
        const options = {
          url: `${base}searchByLocation`,
          form: {
            country: "US",
            region: "New Jersey",
            city: "Teaneck",
          }
        };
        request.post(options, (err, res, body) => {

          var shulData = JSON.parse(res.body)
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(shulData.length).toBe(1);
          expect(shulData[0].name).toBe("Test Shul");
          done();
        });
      });

    });

    describe("POST /shuls/searchByParams", () => {

      it("should return a status code of 200 and all shuls that meet the parameters", (done) => {
        createShul({name:"Fem Lead Shul", femLead:1})
        const options = {
          url: `${base}searchByParams`,
          form: {
            femLead: '1',
            kaddishAlone: '3'
          }
        };
        request.post(options, (err, res, body) => {
          var shulData = JSON.parse(res.body)
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(shulData.length).toBe(1);
          expect(shulData[0].name).toBe("Fem Lead Shul");
          done();
        });
      });

    });

  });
});
