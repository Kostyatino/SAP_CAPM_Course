using myCompany.hr.lms from '../../../srv/simpleSRV';

annotate myCompany.hr.lms.StudentEntity with @(
     UI: {
    SelectionFields: [ email,first_name],
    LineItem: [
      {Value: email,
            Label:'email'},
      {Value: first_name,
            Label:'first_name'},
      {Value: last_name,
            Label:'last_name'},
      {Value: date_sign_up,
            Label:'date_sign_up'}
    ],
  HeaderInfo: {
      TypeName: 'email', TypeNamePlural: 'Emails',
      Title: { Value: email },
      Description: { Value: first_name }
    }
}
);