const cds = require("@sap/cds");
const { Students } = cds.entities("myCompany.hr.lms");
const { Enrollments } = cds.entities("myCompany.hr.lms1");

module.exports["mysrvdemo"] = srv => {
  srv.on("READ", "GetStudent", async (req, res) => {
    const { SELECT } = cds.ql(req);
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
  console.log(srv.entities);
  srv.on("READ", "GetStudent", (req, res) => {
    console.log("Inside GetStudent");
  });

  // draftPrepare.on => {

  // };

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

  // srv.on("EDIT", "GetStudent", (req, res) => {
  //   console.log("Inside EDIT Student");
  // });

  // srv.on("EDIT", "GetEnrollment", (req, res) => {
  //   console.log("Inside EDIT Enrollment");
  // });

  srv.on("UPDATE", "GetStudent", (req, res) => {
    console.log(req.data);
    console.log("UPDATE Student");
    console.log(res);
  });

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

  srv.on("PATCH", "GetEnrollment", (req, res) => {
    console.log("***********Inside on PATCH Enrollment");
    //const { INSERT, SELECT } = cds.ql(req);
    // let record = await SELECT.from(Enrollments).where({ ID: req.data.ID });
    // console.log(record);
    // let output = await cds
    //   .transaction(req)
    //   .run(
    //     INSERT.into(Enrollments).entries({
    //       ID: req.data.ID,
    //       course_ID: req.data.course_ID,
    //       student_ID: "d5514580-2570-11ea-978f-2e728ce88124"
    //     })
    //   )
    //   .then((resolve, reject) => {
    //     console.log("resolve:", resolve);
    //     console.log("reject:", reject);
    //     if (typeof resolve !== "undefined") {
    //       return req.data;
    //     } else {
    //       req.error(409, "Record Not Found");
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     req.error(500, "Error in Updating Record");
    //   });
  });

  srv.before("CREATE", "GetStudent", req => {
    console.log("Inside Create Student");
  });

  srv.on("NEW", "GetStudent", req => {
    console.log("Inside SAVE Student");
  });

  srv.on("NEW", "GetEnrollment", req => {
    console.log("Inside SAVE GetEnrollment");
  });
};
