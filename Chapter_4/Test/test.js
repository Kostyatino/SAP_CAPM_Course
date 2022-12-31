const cds = require("@sap/cds");

/*
beforeAll(async () => {
  await cds.connect({ kind: "sqlite", database: ":memory:" });
  const csn = await cds.load("srv");
  await cds.deploy(csn);
  app.use(proxy()); // I've attempted various ways of adding it in here
  await cds.serve("all", { logLevel }).in(app);
});
afterAll(async () => {
  await cds.disconnect();
}); */

describe("Testing DB Connection", () => {

  it("Deploy the db schema to sqlite in-memory", async () => {
    let db = await cds.deploy(__dirname + "/index").to("sqlite::memory:");
    expect(db.model).toBeDefined();
  });

});

describe("Testing Service Entity STUDENTS", () => {
  
  it("Service Check", async () => {
      let srv = await cds.serve("mysrvdemoapp").from(__dirname + "/index.cds");
      expect(srv.name).toMatch("mysrvdemoapp");
  });

  it("Service SELECT Entry", async () => {
    const { Students } = cds.entities("myCompany.hr.lms1");

    expect(
      await SELECT.one.from(Students).where({'first_name': "demo"})
    ).toMatchObject({'email': "demo@demo1.com"});

  });

  it("Service UPDATE Entry", async () => {
    const { Students } = cds.entities("myCompany.hr.lms1");

    await UPDATE(Students).set({'first_name': "Jeremiah"}).where({'email': "jermiah@demo1.com"})

    expect(
      await SELECT.one.from(Students).where({'email': "jermiah@demo1.com"})
    ).toMatchObject({'first_name': "Jeremiah"});

  });

  it("Service INSERT Entry", async () => {
    const { Students } = cds.entities("myCompany.hr.lms1");

    await INSERT.into(Students).entries({
      email: "anita.becker@gmail.com",
      first_name: "Anita",
      last_name:  "Becker"
    });

    expect(
      await SELECT.one.from(Students).where({'first_name': "Anita", 'last_name':  "Becker"})
    ).toMatchObject({'email': "anita.becker@gmail.com" });

  });

});

describe("Testing Entities Navigation", () => {

  // /mysrvdemoapp/GetStudent(ID=d5514580-2570-11ea-978f-2e728ce88123,IsActiveEntity=true)/enrollment(ID=d5514580-2570-11ea-978f-2e728ce88120,IsActiveEntity=true)
  
  //jest.setTimeout(30000);
  it("Check Student-Enrollment Navigaion", async () => {
    let app = require("express");
    let srv = require("supertest")(app);

    let {body} = srv.get("/mysrvdemoapp/GetStudent");

    expect(body).toBeDefined();
  });

});



/*
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
*/