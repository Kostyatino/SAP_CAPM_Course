const cds = require("@sap/cds");
const { Students } = cds.entities("myCompany.hr.lms1");
//const { Enrollments } = cds.entities("myCompany.hr.lms1");


module.exports["mysrvdemo"] = srv => {
  srv.on("READ", "GetStudent", async (req, res) => {
    // const { SELECT } = cds.ql(req);

    console.log(" --- mysrvdemo-GetStudent --- ");

    const aFilter = req.query.SELECT.where;

    if (typeof aFilter !== "undefined")
      return await SELECT.from(Students).where(aFilter);

    return await SELECT.from(Students);
  });

srv.after("READ", "GetStudent", data => {
    return data.map(d => {
      //d.first_name = d.first_name + " " + d.last_name;
      return d;
    });
  });

  srv.on("CREATE", "UpdateStudent", async (req, res) => {
    let firstName = req.data.first_name;
    let lastName = req.data.last_name;
    let returnData = await cds
      .transaction(req)
      .run([
        UPDATE(Students)
          .set({
            first_name: firstName
          })
          .where({ first_name: "Mr. " + firstName }),
        UPDATE(Students)
          .set({
            last_name: "randomLast"
          })
          .where({ last_name: lastName })
      ])
      .then((resolve, reject) => {
        console.log("resolve:", resolve);
        console.log("reject:", reject);

        if (typeof resolve !== "undefined") {
          return req.data;
        } else {
          req.error(409, "Record Not Found");
        }
      })
      .catch(err => {
        console.log(err);
        req.error(500, "Error in Updating Record");
      });
    console.log("Before End", returnData);
    return returnData;
  });

  srv.on("CREATE", "InsertStudent", async (req, res) => {
    let returnData = await cds
      .transaction(req)
      .run(
        INSERT.into(Students).entries({
          email: req.data.email,
          first_name: req.data.first_name,
          last_name: req.data.last_name,
          date_sign_up: req.data.date_sign_up
        })
      )
      .then((resolve, reject) => {
        console.log("resolve:", resolve);
        console.log("reject:", reject);

        if (typeof resolve !== "undefined") {
          return req.data;
        } else {
          req.error(409, "Record Not Found");
        }
      })
      .catch(err => {
        console.log(err);
        req.error(500, "Error in Updating Record");
      });
    console.log("Before End", returnData);
    return returnData;
  });

  srv.on("CREATE", "DeleteStudent", async (req, res) => {
    let returnData = await cds
      .transaction(req)
      .run(
        DELETE.from(Students).where({
          email: req.data.email
        })
      )
      .then((resolve, reject) => {
        console.log("resolve:", resolve);
        console.log("reject:", reject);

        if (typeof resolve !== "undefined") {
          return req.data;
        } else {
          req.error(409, "Record Not Found");
        }
      })
      .catch(err => {
        console.log(err);
        req.error(500, "Error in Updating Record");
      });
    console.log("Before End", returnData);
    return returnData;
  });
};

/*
module.exports["mysrvdemoapp"] = srv => {
  //console.log(srv.entities);
  srv.on("READ", "GetStudent", async (req, res) => {
    console.log(" --- Inside GetStudent --- ");

    //const { SELECT } = cds.ql(req);
    const aFilter = req.query.SELECT.where;

    if (typeof aFilter !== "undefined")
      return await SELECT.from(Students).where(aFilter);

    return await SELECT.from(Students);

  });

}; */
