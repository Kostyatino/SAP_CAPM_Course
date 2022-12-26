namespace myCompany.hr.course_structure;

entity Contents {
    key ID: UUID;
    url: String(2048);
    published: Date;
    content_type: String(100);
    course: Association to Courses;
}

entity Courses {
    key ID: Integer;
    course_name: String(100);
    course_url: String(2048);
    course_duaration: Decimal;    
    course_price: Decimal(5, 2);
    published_status: Boolean;
    content: Association to many Contents on content.course = $self;
    enrollment: Association to many Enrollments on enrollment.course = $self;
}

entity Enrollments {
    key ID: Integer;
    course: Association to Courses;
    student: Association to Students;

}

entity Students {
    key email: String(256);
    first_name: String(50);
    last_name: String(100);
    signup_date: Date;
    enrollment: Association to many Enrollments on enrollment.student = $self;       
}

annotate Students with @(

    UI: {
        LineItem: [ {
                      Value: email,
                      Label:'Email'
                    }, {
                      Value: first_name,
                      Label:'First Name (Structure.cds)'
                    }, {
                      Value: last_name,
                      Label:'Last Name (Structure.cds)'
                    }, {
                      Value: signup_date,
                      Label:'Sign up date'
                }],
          SelectionFields: [first_name, last_name],
          HeaderInfo: {
              TypeName: 'Test',
              TypeNamePlural: 'Tests',               
            Title: {Value: email},
            Description:{
              Value: last_name 
            }
          }
        }

);