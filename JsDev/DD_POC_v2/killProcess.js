var ps = require('ps-node');

// A simple pid lookup 
ps.lookup({
    command: 'node',
    psargs: 'chromedriver'
}, function(err, resultList) {
    if (err) {
        throw new Error(err);
    }

    resultList.forEach(function(process) {
        if (process) {
            console.log('PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments);
            ps.kill(process.pid, function(err) {
                if (err) {
                    throw new Error(err);
                } else {
                    console.log('Process %s has been killed!', pid);
                }
            });
        }
    });
});
