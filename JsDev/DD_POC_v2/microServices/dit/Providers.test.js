"use strict"
var request = require('request');

//Test data can be maintain in JSON file.
var tData = {
    host: 'http://aw-lx0095:19001',
    zipCode: 94105,
    repError: null,
    repStatusCode: 200,
    providersZIPCount: 7198,
    providersDistCount: 3694,
    dist:30 
}



describe("Provider Directory:", function() {

    it('REST API: With Zip Code: "' +  tData.zipCode + '"', function(done) {
        request(tData.host+'/providers?zipcode='+tData.zipCode+'&distance=60&page=0&per_page=10&max=1500&meta_data=false', function(error, response, body) {
            // Assertion for REST API
            expect(error).toEqual(tData.repError);
            console.log('1) Error:', error);
            // // // // Assertion for Status Code
            expect(response && response.statusCode).toEqual(tData.repStatusCode);
            console.log('2) StatusCode:', response && response.statusCode);
            //Converting object into JSON
            // console.log('1) Body:', body);
            var RespZIPTotal = JSON.parse(body);
            // done();
            // Assertion Providers Count
            expect(RespZIPTotal.total).toEqual(tData.providersZIPCount);
            console.log('3) ProviderDirectoryLastUpdateDate:', RespZIPTotal.total);
            done();
        });
    });

     it('REST API: With Distance: "' +  tData.dist + '"', function(done) {
        request(tData.host+'/providers?zipcode='+tData.zipCode+'&distance='+tData.dist+'&page=0&per_page=10&max=1500&meta_data=false', function(error, response, body) {
          
            // // Assertion for REST API
            expect(error).toEqual(tData.repError);
            console.log('1) Error:', error);
            // // // // // Assertion for Status Code
            expect(response && response.statusCode).toEqual(tData.repStatusCode);
            console.log('2) StatusCode:', response && response.statusCode);
            // //Converting object into JSON
            // // console.log('1) Body:', body);
            var RespDistTotal = JSON.parse(body);
            // Assertion Providers Count
            expect(RespDistTotal.total).toEqual(tData.providersDistCount);
            console.log('3) ProviderDirectoryLastUpdateDate:', RespDistTotal.total);
            done();
            
        });
    });
});
