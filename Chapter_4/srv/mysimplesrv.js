const cds = require("@sap/cds");
const { Students } = cds.entities("myCompany.hr.lms1");
const { changelog } = cds.entities("myCompany.hr.lms1");


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


module.exports["mysrvdemoapp"] = srv => {
  //console.log(srv.entities);
  srv.before("READ", "GetStudent", async (req, res) => {
    console.log(" --- Inside GetStudent --- ");
  });
  /*
  srv.on("READ", "GetCourse", (req, res) => {
    console.log("Inside GetCourse");
  });

  srv.on("READ", "GetEnrollment", (req, res) => {
    console.log("Inside GetEnrollment");
  });

  srv.on("READ", "GetContent", (req, res) => {
    console.log("Inside GetContent");
  });

  srv.on("CREATE", "GetStudent", (req, res) => {
    console.log("Inside Create Student");
  });

  srv.on("EDIT", "GetStudent", (req, res) => {
    console.log("Inside EDIT Student");
  });

  srv.on("EDIT", "GetEnrollment", (req, res) => {
    console.log("Inside EDIT Enrollment");
  });
*/
  srv.before("UPDATE", "GetStudent", (req, res) => {
    console.log("*** Before UPDATE Student");
  });

  srv.after("UPDATE", "GetStudent", async (req, res) => {
    console.log("*** After UPDATE Student");

    let check = await INSERT.into(changelog).entries({ 'date_changed': new Date(), 'entity_name': "Students"});

    console.log(check);
  });

/*
  srv.on("CREATE", "GetEnrollment", (req, res) => {
    console.log("Create New GetEnrollment");
  });
  srv.on("PUT", "GetEnrollment", (req, res) => {
    console.log("PUT New GetEnrollment");
  });
  srv.on("UPDATE", "GetEnrollment", (req, res) => {
    console.log("PUT New GetEnrollment");
  });

  srv.before("PATCH", "GetEnrollment", (req, res) => {
    console.log("***********Inside before PATCH Enrollment");
  });
  */
};
