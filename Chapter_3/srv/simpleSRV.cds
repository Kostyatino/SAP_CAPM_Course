using myCompany.hr.lms from '../db/Student';
using { myCompany.hr.course_structure as structure } from '../db/Structure';

service exportSRV @(path:'myLms'){

    //@readonly   entity StudentEntity        as projection on lms.Student;
    @updateonly entity UpdateStudentEntity  as projection on lms.Student;
    @insertonly entity InsertStudentEntity  as projection on lms.Student;
    @deleteonly entity DeleteStudentEntity  as projection on lms.Student;

    // function magnificentEvent (msg:String) returns String;

}

extend service exportSRV with {
    @readonly entity CustomGetStudent as select from lms.Student{
        *, first_name || ' ' || last_name as full_name : String
    } excluding {
        date_sign_up
    }
}

service Structure {
    @readonly entity CourseEntity as projection on structure.Courses;    
    @readonly entity ContentEntity as projection on structure.Contents;    
    @readonly entity EnrollmentEntity as projection on structure.Enrollments;
    @readonly entity GetStudentEntity as projection on structure.Students;    
}