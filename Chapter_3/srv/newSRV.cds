using myCompany.hr.lms from '../db/Student';
using exportSRV as ExpSRV from './simpleSRV';

extend service exportSRV with {
    @readonly entity ExtendedGetStudent as select from lms.Student{
        *, first_name || ' ' || last_name as full_name : String
    } excluding {
        date_sign_up
    }
}