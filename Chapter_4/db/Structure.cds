namespace myCompany.hr.lms1;
using { Currency,managed,cuid } from '@sap/cds/common';

entity Contents{

key ID: Integer;
content_url: String(1024);
data_published: Date;
content_type: String(20);
course: Association to Courses;
}

entity Courses {
key ID: UUID @title:'Course ID';
course_name: String(100) @title:'Course Name';
course_url: String(1024) @title:'Course URL';
course_duration: Integer @title:'Course Duration';
course_price: Decimal(5, 2) @title:'Course Price';
currency: Currency @title:'Course Currency';
published_status: Boolean @title:'Is Published';
content: Association to Contents on content.course = $self;
enrollment: Association to many Enrollments on enrollment.course = $self;

}


entity Enrollments {
key ID: UUID @title:'Enrollment ID';
course: Association to Courses @title:'Course';
student: Association to Students @title:'Student';

}


entity Students{
key ID: UUID @title:'Student ID';
email : String(50);
first_name: String(40);
last_name: String(40);
date_sign_up: Date;
enrollment: Association to many Enrollments on enrollment.student = $self;


}

