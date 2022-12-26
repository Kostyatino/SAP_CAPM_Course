using myCompany.hr.lms from '../db/Student';

service exportSRV @(path:'myLms'){

    @readonly   entity StudentEntity        as projection on lms.Student;
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