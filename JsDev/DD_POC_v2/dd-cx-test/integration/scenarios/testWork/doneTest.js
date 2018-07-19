//
//
// https://stackoverflow.com/questions/42281591/what-done-is-for-and-how-to-use-it-protractor-jasmine



describe('Done functionality', function(){

    var echoInOneSecond = function(value){
        console.log('creating promise for ', value);
        return new Promise(function(resolve, reject){
            console.log('resolving with ', value);
            resolve(value);
        });
    };

    it('#1 this will untruly PASS', function(){
        var p = echoInOneSecond('value #1');
        p.then(function(value){
            console.log('#1 expecting...and value is ', value);
            expect(value).toBe('value #1');
        });
    });

    it('#2 this will NOT FAIL', function(){
        var p = echoInOneSecond('value #2');
        p.then(function(value){
            console.log('#2 expecting... and value is ', value);
            expect(value).not.toBe('value #2');
        });
    });

    it('3 = will truly FAIl', function(done){
        var p = echoInOneSecond('value #3');
        p.then(function(value){
            console.log('#3 expecting... and value is ', value);
            expect(value).not.toBe('value #3');
            done();
        });
    });

    it('4 = this will truly PASS', function(done){
        var p = echoInOneSecond('value #4');
        p.then(function(value){
            console.log('#4 expecting... and value is ', value);
            expect(value).toBe('value #4');
            done();
        });
    });
});