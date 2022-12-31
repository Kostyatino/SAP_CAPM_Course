using { mysrvdemoapp } from '../srv/mysimplesrv' ;
// using from '../srv/mynewsrv' ;


using { myCompany.hr.lms1 as lms1 } from '../db/Structure';

service mysrvdemoapp1{
      entity GetStudent as SELECT from lms1.Students;
}


//annotate mysrvdemoapp.GetStudent with @odata.draft.enabled;