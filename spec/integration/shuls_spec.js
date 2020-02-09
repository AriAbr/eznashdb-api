const request = require("request");
var http = require('http');
const server = require('../../bin/www');
const base = ("http://localhost:9000/shuls/");

const sequelize = require("../../src/db/models/index").sequelize;
const Shul = require("../../src/db/models").Shul;

describe("routes : shuls", () => {

  beforeEach((done) => {
    this.shul;
    sequelize.sync({force : true}).then((res) => {

      Shul.create({
        name: "Integration Test Shul 1",
        nussach: "Ashkenaz",
        denom: "MO",
        country: "United States",
        region: "New Jersey",
        city: "Teaneck",
        femLead: 0,
        kaddishWithMen: 1,
        kaddishAlone: 3,
        childcare: 2,
      })
      .then((shul) => {
        this.shul = shul;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });
  });

  describe("user performing CRUD actions for Shul", () => {

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

    describe("GET /shuls/getAll", () => {

      it("should return a status code of 200 and all shuls", (done) => {
        request.get(`${base}getAll`, (err, res, body) => {
          var shuls = JSON.parse(res.body)
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(shuls[0].name).toBe("Integration Test Shul 1");
          done();
        });
      });

    });

    describe("POST /shuls/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          name: "Created Shul 1",
          nussach: "Ashkenaz",
          denom: "MO",
          country: "United States",
          region: "New Jersey",
          city: "Teaneck",
          femLead: 0,
          kaddishWithMen: 1,
          kaddishAlone: 3,
          childcare: 2,
        }
      };

      it("should return a status code of 200 and create a new shul", (done) => {
        request.post(options,

          (err, res, body) => {
            Shul.findOne({where: {name: "Created Shul 1"}})
            .then((shul) =>{
              expect(res.statusCode).toBe(200);
              expect(shul.name).toBe("Created Shul 1");
              expect(shul.city).toBe("Teaneck");
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
        const options = {
          url: `${base}create`,
          form: { // leaving out childcare field
            name: "Created Shul 2",
            nussach: "Ashkenaz",
            denom: "MO",
            country: "United States",
            region: "New Jersey",
            city: "Teaneck",
            femLead: 0,
            kaddishWithMen: 1,
            kaddishAlone: 3,
          }
        };

        request.post(options,
          (err, res, body) => {

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

  });
});
