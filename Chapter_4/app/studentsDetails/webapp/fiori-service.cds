using mysrvdemoapp as serviceStudent from '../../../srv/mysimplesrv';

annotate serviceStudent.GetStudent with @(
    UI:{
        SelectionFields: [email],
        LineItem: [
            { 
                Label: 'ID (fiori-service)',
                Value: ID
            },
            {
                Label: 'Email',
                Value: email,
            },
            {
                Label: 'First Name',
                Value: first_name,
            },
            {
                Label: 'Last Name',
                Value: last_name,
            },
            {
                Label: 'Date Join',
                Value: date_sign_up,
            }
        ],
        HeaderInfo: {
            TypeName: 'Student',
            TypeNamePlural: 'Students',
            Title: { 
                Value: last_name
                },
            Description: {
                Value: first_name,
                Label: 'First Name (fiori-service)'
            }
        },

        Facets:[
            {
                $Type: 'UI.ReferenceFacet',
                Label: 'Personal Information',
                Target: '@UI.FieldGroup#PersonalStudentInfo'
            },
             {
                $Type: 'UI.ReferenceFacet',
                Label: 'Enrollment Details',
                Target: 'enrollment/@UI.LineItem'
            }
        ],

        FieldGroup#PersonalStudentInfo:{

            Data:[
                {
                    Label: 'First Name (fiori-service)',
                    Value: first_name
                },
                 {
                    Label: 'Last Name',
                    Value: last_name
                },
                {
                    Label: 'Email',
                    Value: email
                },
                {
                    Label: 'Date Sign Up',
                    Value: date_sign_up
                }
            ]
        },
    }
);

annotate serviceStudent.GetEnrollment with {
	course @(
        Common: {
			Text: course.course_name,
            Label : 'Course Name',
			FieldControl: #Mandatory
		},
		ValueList.entity:'GetCourse'
	);
}
// annotate AdminService.GetCourse with {
// 	ID @Common.FieldControl;
//     course_name @Common.FieldControl;
// }

annotate serviceStudent.GetEnrollment with @(
    UI:{
    
     LineItem: [
            {
                Label: 'Enrollment ID (fiori-service)',
                Value: ID,
            },
            {
                Label: 'Course ID',
                Value: course_ID,
            }
            //,
            //{
                //Label: 'Student ID',
                //Value: student.ID,
            //}
        ],

         HeaderInfo: {
            TypeName: 'Course',
            TypeNamePlural: 'Courses',
            Title: { 
                Value: ID
                },
            Description: {
                Value: course_ID
            }
        },

        Identification: [
            {
                Value:course_ID, Label:'Course Name'
            }
        ],
        
        Facets: [
			{
                $Type: 'UI.ReferenceFacet',
                Label: '{i18n>Enrollments}',
                Target: '@UI.Identification'
            },
            {
                $Type: 'UI.ReferenceFacet',
                Label: 'Course Details (fiori-service)',
                Target: 'course/@UI.FieldGroup#CourseDetails'
            }
		],
       
            //  {
            //     $Type: 'UI.ReferenceFacet',
            //     Label: 'Course Details',
            //     Target: '@UI.FieldGroup#EnrollmentDetails'
            // }
        //  ],
        //  FieldGroup#EnrollmentDetails:{

        //     Data:[
        //         {
        //             Label: 'Course ID',
        //             Value: course_ID
        //         },
        //          {
        //             Label: 'Student ID',
        //             Value: student_ID
        //         }
        //     ]
        // }

       
}){createdAt @UI.HiddenFilter:false;
	createdBy @UI.HiddenFilter:false;
    };



// annotate serviceStudent.GetEnrollment with {

// 	course_ID @title:'Course ID';
// }

annotate serviceStudent.GetCourse with @(

UI:{
     Identification: [
            {Value:course_name, Label:'Course Name' },
            {Value: ID,         Label:'Course ID'   }
         ],

    FieldGroup#CourseDetails: {

        Data:[
            {
                Label: 'Course Name (fiori-service)',
                Value: course_name

            },
                {
                Label: 'Course Duration in Hrs',
                Value: course_duration
            },
            {
                Label: 'Course Price in USD',
                Value: course_price
            },
            {
                Label: 'Course Url',
                Value: course_url
            },
            {
                Label: 'Currency',
                Value: currency_code
            }
        ]
    },

});
// {
// 	course_name @ValueList.entity:'GetCourse';
// };

// annotate serviceStudent.GetCourse with {
// 	course_url @title:'Course URL' ;
// 	course_name @title:'Course Name';
// }