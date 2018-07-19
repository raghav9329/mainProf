'use strict';
describe('Providers About: ', function() {

  // Providers API verified Keys datattypes 
    it(" About Providers REST API", function(doneFn) {
        //Construction of REST API URL HOST+Resource +Params
        let apiurl = Utility.getapiurl('ABOUT');
        console.log("api url ------" + apiurl);
         //REST API call using Frisby Node Module & Verifying "Keys" datatypes with Frisby Joi expect's
        frisby.get(apiurl)
            .expect('jsonTypes', {
                buildNumber: Joi.string(),
                providerDirectoryLastUpdateDate: Joi.string(),
                revisionNumber: Joi.string()
            })
            .done(doneFn);
    });
});
