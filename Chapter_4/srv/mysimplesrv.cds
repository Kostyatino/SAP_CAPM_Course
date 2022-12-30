using myCompany.hr.lms from '../db/Students';
using { myCompany.hr.lms1 as lms1 } from '../db/Structure';

service mysrvdemo{
    
    entity GetStudent as projection on lms.Students;
    entity UpdateStudent as projection on lms.Students;
    entity InsertStudent as projection on lms.Students;
    @deleteonly entity DeleteStudent as projection on lms.Students;

}

/* @(_requires:'admin')*/
service mysrvdemoapp {
    // Projection allows for custom service parsing-logic implementation
    // Select is a direct SQL query

    entity GetStudent as select from lms1.Students;
    entity GetEnrollment as select from lms1.Enrollments;
    //entity GetStudent as select from lms1.Students {*, count(ID) as count: Integer};
    entity GetCourse as projection on lms1.Courses;
    entity GetContent as projection on lms1.Contents;
} 

annotate mysrvdemoapp.GetStudent with @odata.draft.enabled;