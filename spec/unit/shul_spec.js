const sequelize = require("../../src/db/models/index").sequelize;
const Shul = require("../../src/db/models").Shul;

describe("Shul", () => {

  beforeEach((done) => {
    this.shul;

    sequelize.sync({force: true}).then((res) => {

      Shul.create({
        title: "Test Shul",
        body: "This Shul is a test",
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
    it("should create a shul object with a title and body and associated user", (done) => {

      Shul.create({
        title: "Create() test shul",
        body: "This shul will test the create() method.",
      })
      .then((shul) => {
        expect(shul.title).toBe("Create() test shul");
        expect(shul.body).toBe("This shul will test the create() method.");
        expect(shul.private).toBe(false);
        done();
      })
      .catch((err) => {
        console.log();
        done();
      });
    });

    it("should not create a shul with missing title, body or assigned user", (done) => {
      Shul.create({
        title:"this shul only has a title"
      })
      .then((shul) => {
        //validation error will skip this
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Shul.body cannot be null");
        done();
      });
    });
  });
});
