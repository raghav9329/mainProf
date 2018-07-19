//
//
//
//
//
//https://stackoverflow.com/questions/39918281/protractor-wait-for-rest-call-finish

describe('sample test', function(){
    it('test promise', function() {
        browser.get('http://www.cnn.com')
        console.log('start');
        flow = protractor.promise.controlFlow();
        var d = protractor.promise.defer();
        var restCall = function _makeRestCall() {
            setTimeout(function () {
                console.log("rest call");
                d.fulfill('ok');
            }, 300);
            return d.promise
        };
        console.log('before expect');

        // Can directly add expect here as flow.execute() returns promise 
        expect(flow.execute(restCall)).toBe('ok');

        // All subsequent browser command part of Protractor Control Flow will be executed only after the promise of restCall is resolved

        browser.getCurrentUrl().then(function(value) {
            console.log('after expect');
            console.log('rest test based on deffer result');
            console.log(value);
        });

    });
});