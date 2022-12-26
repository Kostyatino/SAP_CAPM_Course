namespace myCompany.hr.lms;

entity Student{
       key email : String(65);
       first_name : String(20);
       last_name : String(20);
       date_sign_up : Date;
   }

annotate Student with @(

    UI: {
        LineItem: [ {
                      Value: email,
                      Label:'Email'
                    }, {
                      Value: first_name,
                      Label:'First Neme'
                    }, {
                      Value: last_name,
                      Label:'Last Name'
                    }, {
                      Value: date_sign_up,
                      Label:'Sign up date'
                }],
          SelectionFields: [email],
          HeaderInfo: {
              TypeName: 'Test',
              TypeNamePlural: 'Tests',               
            Title: {Value:email},
            Description:{
              Value: last_name 
            }
          }
        }

);