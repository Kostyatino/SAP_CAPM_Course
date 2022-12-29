using myCompany.hr.lms from '../db/Students';
using mysrvdemo as mysrvdemo from '../srv/mysimplesrv';


extend service mysrvdemo with @(path:'mylms',impl:'./mynewsrv.js')  {
    @readonly entity CustomGetStudent as select from lms.Students{
        *,
        first_name ||' '|| last_name as full_name: String
    }excluding{
        date_sign_up
    }
}


