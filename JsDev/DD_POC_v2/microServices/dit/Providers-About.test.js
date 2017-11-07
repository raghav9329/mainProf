var request = require('request');

//Test data can be maintain in JSON file.
var tData = {
    URL : 'http://aw-lx0095:19001/providers/about',
    repError : null,
    repStatusCode : 200,
    providerDirectoryLastUpdateDate : '10-25-2017',
    buildNumber : '680',
    revisionNumber : '619828b69e2b5e980f2201dd773e9296767702c8'
}

describe("Provider Directory:", function() {
    it("REST API: tData.URL", function() {

        request(tData.URL, function(error, response, body) {
            // Assertion for REST API
            expect(error).toEqual(tData.repError);
            console.log('1) Error:', error);            
            // Assertion for Status Code
            expect(response && response.statusCode).toEqual(tData.repStatusCode);
            console.log('2) StatusCode:', response && response.statusCode);
            //Printing Response Body
            console.log('3) Body:', body);
            var RespBody = JSON.parse(body);
            // Assertion PD Last Update
            expect(RespBody.providerDirectoryLastUpdateDate).toEqual(tData.providerDirectoryLastUpdateDate);
            console.log('4) ProviderDirectoryLastUpdateDate:', RespBody.providerDirectoryLastUpdateDate);
            // Assertion Build Number
			expect(RespBody.buildNumber).toEqual(tData.buildNumber);
            console.log('5) BuildNumber:', RespBody.buildNumber);
            // Assertion Revision Number
            expect(RespBody.revisionNumber).toEqual(tData.revisionNumber);
            console.log('6) RevisionNumber:', RespBody.revisionNumber);
            

        });
    });
});
