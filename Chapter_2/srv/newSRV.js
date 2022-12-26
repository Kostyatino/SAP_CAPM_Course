/*sap.ui.define([
	"sap/ui/base/ManagedObject"
], function(
	ManagedObject
) {
	"use strict";

	return ManagedObject.extend("undefined", {
	});
}); */

const cds = require('@sap/cds');
const {Student} = cds.entities("myCompany.hr.lms");

module.exports = srv => {
    srv.before("CREATE", "InsertStudent", async (req, res) => {

        if(req.data.email.indexOf("@") === -1){
            req.error(500,"Invalid Email.");
        }

    });
}