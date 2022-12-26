using myCompany.hr.course_structure as Structure from '../../../srv/simpleSRV';

annotate Structure.Students with @(
    UI:{
        SelectionFields: [first_name, last_name],
        LineItem: [
            {
                Label: 'Email',
                Value: email,
            },
            {
                Label: 'First Name (Fiori.cds)',
                Value: first_name,
            },
            {
                Label: 'Last Name (Fiori.cds)',
                Value: last_name,
            },
            {
                Label: 'Signup Date (LineItem)',
                Value: signup_date,
            }
        ],
        HeaderInfo: {
            TypeName: 'Student',
            TypeNamePlural: 'Students',
            Title: { 
                Value: last_name                
                },
            Description: {
                Value: email,
                Label: 'Email'
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
                    Label: 'First Name (Fiori.cds)',
                    Value: first_name
                },
                 {
                    Label: 'Last Name (Fiori.cds)',
                    Value: last_name
                },
                {
                    Label: 'Email',
                    Value: email
                },
                {
                    Label: 'Signup Date (FieldGroup)',
                    Value: signup_date
                }
            ]
        },
    }

);

annotate Structure.Enrollments with @(
    UI: {

        HeaderInfo: {
            TypeName: 'Course',
            TypeNamePlural: 'Courses',
            Title: { 
                Value: ID            
                },
            Description: {
                Value: student_email,
                Label: 'Student Email'
            }
        },        

        LineItem: [
            {
                Label: 'ID',
                Value: ID,
            },
            {
                Label: 'Course (Fiori.cds)',
                Value: course_ID,
            },
            {
                Label: 'Student (Fiori.cds)',
                Value: student_email,
            }            
        ],

        Facets:[
            {
                $Type: 'UI.ReferenceFacet',
                Label: 'Enrollment Details',
                Target: 'course/@UI.FieldGroup#CourseDetails'
            }
        ],

    }
);

annotate Structure.Courses with @(
    UI: {
        HeaderInfo: {
            TypeName: 'Course',
            TypeNamePlural: 'Courses',
            Title: { 
                Value:  ID            
                },
            Description: {
                Value: course_name,
                Label: 'Course Name'
            }
        },

        Facets:[
            {
                $Type: 'UI.ReferenceFacet',
                Label: 'Personal Information',
                Target: '@UI.FieldGroup#CourseDetails'
            }
        ],

        FieldGroup#CourseDetails:{

            Data:[
                {
                    Value: ID,
                    Label: 'Course ID (Fiori.cds)'
                },
                {
                    Value: course_duaration,
                    Label: 'Duaration (Fiori.cds)'
                },
                 {
                    Label: 'Price (Fiori.cds)',
                    Value: course_price
                },
                {
                    Label: 'URL',
                    Value: course_url
                }
            ]
        }
    }
);
