const sequelize = require("../../src/db/models/index").sequelize;
const Shul = require("../../src/db/models").Shul;

describe("Shul", () => {

  beforeEach((done) => {
    this.shul;

    sequelize.sync({force: true}).then((res) => {

      Shul.create({
        name: "Test Shul",
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
      });
    });
  });

  describe("#create()", () => {
    it("should create a shul object with relevant details", (done) => {
      Shul.create({
        name: "Test Shul 1",
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
        expect(shul.name).toBe("Test Shul 1");
        expect(shul.nussach).toBe("Ashkenaz");
        expect(shul.denom).toBe("MO");
        expect(shul.country).toBe("United States");
        expect(shul.region).toBe("New Jersey");
        expect(shul.city).toBe("Teaneck");
        expect(shul.femLead).toBe(0);
        expect(shul.kaddishWithMen).toBe(1);
        expect(shul.kaddishAlone).toBe(3);
        expect(shul.childcare).toBe(2);
        done();
      })
      .catch((err) => {
        console.log();
        done();
      });
    });

    it("should not create a shul with missing info", (done) => {
      Shul.create({
        name:"this shul only has a name"
      })
      .then((shul) => {
        //validation error will skip this
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Shul.nussach cannot be null");
        done();
      });
    });
  });
});
