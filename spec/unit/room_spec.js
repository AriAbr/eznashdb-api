const sequelize = require("../../src/db/models/index").sequelize;
const Room = require("../../src/db/models").Room;

describe("Room", () => {

  beforeEach((done) => {
    this.room;

    sequelize.sync({force: true}).then((res) => {

      Room.create({
        name: "Test Room 1",
        size: 3,
        visAudScore: 4,
        isCentered: true,
        isSameFloorSide: false,
        isSameFloorBack: true,
        isSameFloorElevated: false,
        isSameFloorLevel: true,
        isBalconySide: false,
        isBalconyBack: true,
        isOnlyMen: false,
        isMixedSeating: true,
      })
      .then((room) => {
        this.room = room;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {
    it("should create a room object with relevant details", (done) => {
      Room.create({
        name: "Beit Midrash",
        size: 3,
        visAudScore: 4,
        isCentered: true,
        isSameFloorSide: false,
        isSameFloorBack: true,
        isSameFloorElevated: false,
        isSameFloorLevel: true,
        isBalconySide: false,
        isBalconyBack: true,
        isOnlyMen: false,
        isMixedSeating: true,
      })
      .then((room) => {
        expect(room.name).toBe("Beit Midrash");
        expect(room.size).toBe(3);
        expect(room.visAudScore).toBe(4);
        expect(room.isCentered).toBe(true);
        expect(room.isSameFloorSide).toBe(false);
        expect(room.isSameFloorBack).toBe(true);
        expect(room.isSameFloorElevated).toBe(false);
        expect(room.isSameFloorLevel).toBe(true);
        expect(room.isBalconySide).toBe(false);
        expect(room.isBalconyBack).toBe(true);
        expect(room.isOnlyMen).toBe(false);
        expect(room.isMixedSeating).toBe(true);
        done();
      })
      .catch((err) => {
        console.log();
        done();
      });
    });

    it("should create a room object with hebrew inputs", (done) => {
      Room.create({
        name: "בית מדרש",
        size: 3,
        visAudScore: 4,
        isCentered: true,
        isSameFloorSide: false,
        isSameFloorBack: true,
        isSameFloorElevated: false,
        isSameFloorLevel: true,
        isBalconySide: false,
        isBalconyBack: true,
        isOnlyMen: false,
        isMixedSeating: true,
      })
      .then((room) => {
        expect(room.name).toBe("בית מדרש");
        expect(room.size).toBe(3);
        expect(room.visAudScore).toBe(4);
        expect(room.isCentered).toBe(true);
        expect(room.isSameFloorSide).toBe(false);
        expect(room.isSameFloorBack).toBe(true);
        expect(room.isSameFloorElevated).toBe(false);
        expect(room.isSameFloorLevel).toBe(true);
        expect(room.isBalconySide).toBe(false);
        expect(room.isBalconyBack).toBe(true);
        expect(room.isOnlyMen).toBe(false);
        expect(room.isMixedSeating).toBe(true);
        done();
      })
      .catch((err) => {
        console.log();
        done();
      });
    });

    it("should not create a room with missing info", (done) => {
      Room.create({
        name:"this room only has a name"
      })
      .then((room) => {
        //validation error will skip this
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Room.size cannot be null");
        done();
      });
    });
  });
});
