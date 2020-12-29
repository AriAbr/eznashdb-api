const sequelize = require("../../src/db/models/index").sequelize;
const Shul = require("../../src/db/models").Shul;
const {createShul} = require("../utils");

describe("Shul", () => {

  beforeEach((done) => {
    this.shul;

    sequelize.sync({force: true}).then((res) => {
      createShul()
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
      createShul({name: "Test Shul 1"})
      .then((shul) => {
        expect(shul.name).toBe("Test Shul 1");
        expect(shul.nussach).toBe("Ashkenaz");
        expect(shul.denom).toBe("MO");
        expect(shul.country).toBe("US");
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

    it("should create a shul object with hebrew inputs", (done) => {
      createShul({name: "בית כנסת 1"})
      .then((shul) => {
        expect(shul.name).toBe("בית כנסת 1");
        expect(shul.nussach).toBe("Ashkenaz");
        expect(shul.denom).toBe("MO");
        expect(shul.country).toBe("US");
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
