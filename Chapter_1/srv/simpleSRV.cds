using myCompany.hr.lms from '../db/Student';

service exportSRV {

    @readonly entity StudentEntity as projection on lms.Student;

    function magnificentEvent (msg:String) returns String;

}