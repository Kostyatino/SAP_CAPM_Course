const cds = require("@sap/cds");

describe("should list all Students ", () => {
  let db, Books;

  it("should deploy the db schema to sqlite in-memory", async () => {
    db = await cds.deploy(__dirname + "/index").to("sqlite::memory:");
    expect(db.model).toBeDefined();
  });
});

describe("should list all Students ", () => {
  const app = require("express")();
  const srv = require("supertest")(app);
  //console.log(srv);
  it("should serve mysrvdemoapp1", async () => {
    const demo = await cds
      .serve("mysrvdemoapp1")
      .from(__dirname + "/index")
      .in(app);

    // console.log(demo);
  });

  it("should serve Student", async () => {
    debugger;
    const res = await srv.get("/mysrvdemoapp1/GetStudent");
    console.log(res.text);
  });
});
