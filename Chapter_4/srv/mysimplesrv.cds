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
    
    entity GetStudent as select from lms1.Students;
    //entity GetStudent as select from lms1.Students {*, count(ID) as count: Integer};
    entity GetCourse as projection on lms1.Courses;
    entity GetContent as projection on lms1.Contents;
    entity GetEnrollment as projection on lms1.Enrollments;

} 

// annotate mysrvdemoapp.GetStudent with @odata.draft.enabled;