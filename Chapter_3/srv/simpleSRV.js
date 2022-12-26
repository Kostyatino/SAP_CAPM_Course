const cds = require('@sap/cds')

this.testString = "I am a test.";
const { Student } = cds.entities("myCompany.hr.lms");
const { Structure} = cds.entities("myCompany.hr.course_structure");

module.exports["exportSRV"] = (srv) => {
    srv.on("READ", "StudentEntity" , async (req, res) => {
      
        const aFilter = req.query.SELECT.from.ref[0].where;
        if(Boolean(aFilter)){
            //var result = await SELECT.from( Student ).where({email: aFilter[2].val});
            var result = await SELECT.from( Student ).where(aFilter);
        } else {
            result = await SELECT.from( Student );           
        }
        
        console.log(result);

        return result;

    });

    srv.after("READ", "StudentEntity", data => {

        return data.map( element => {
            element.first_name = element.first_name + " " + element.last_name;
                return element;
        });
    });

    srv.on("CREATE", "UpdateStudentEntity", async (req, res) => {

        let firstName = req.data.first_name;
        let lastName  = req.data.last_name;                
        let studentEmail = req.data.email;

        let returnData = await cds.transaction(req).run([
            UPDATE(Student).set({
                first_name: firstName,
            }).where({ email: studentEmail}),

            UPDATE(Student).set({
                last_name: lastName,
            }).where({ email: studentEmail})            
        ]).then( (resolve, reject) => {
      
            if(typeof resolve !== "undefined"){
               return req.data;
            } else {
                res.error(409, "Record not found.");
            }

        }).catch( (err) => {
            req.error(500, "Error in Updating Record.")
        });

        return returnData;
        
    });

    srv.on("CREATE", "InsertStudentEntity", async (req, res) => {
        let entry = {first_name:"", last_name: "", email:"", data_sign_up: ""};

        Object.keys(entry).forEach(function(key) {
            entry[key] = req.data[key];
          });

        let returnData = await cds.transaction(req).run(
            INSERT.into("Student").entries(entry)
        ).then( (resolve, reject) => {
      
            if(typeof resolve !== "undefined"){
               return req.data;
            } else {
                res.error(409, "Record not found.");
            }

        }).catch( (err) => {
            req.error(500, "Error in Updating Record.")
        });

        return returnData;
    });

    srv.on("DELETE", "DeleteStudentEntity", async (req, res) => {
        let email = req.data.email;

        let returnData = await cds.transaction(req).run(
            DELETE.from("Student").where({"email": email})
        ).then( (resolve, reject) => {
      
            if(typeof resolve !== "undefined"){
               return req.data;
            } else {
                res.error(409, "Record not found.");
            }

        }).catch( (err) => {
            req.error(500, "Error in Updating Record.")
        });
        
        return returnData;
    });

  }

module.exports["Structure"] = (srv) => {

    /* srv.on("READ", "CourseEntity", (req, res) => {               
        console.log("CourseEntity");
    }); */
    
};