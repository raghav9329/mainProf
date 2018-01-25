var fs = require("fs");
fs.readdirAsync = function(dirname) {
    return new Promise(function(resolve, reject) {
        fs.readdir(dirname, function(err, filenames) {
            if (err)
                reject(err);
            else
                resolve(filenames);
        });
    });
};

// make Promise version of fs.readFile()
fs.readFileAsync = function(filename, enc) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, enc, function(err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

module.exports = fs;

var path = require("path");
getFiles("./results").then(function(ff) {
    var fileName = "./ddTestAutomationResultsDashboard.html";
    var stream = fs.createWriteStream(fileName);

    stream.once("open", function(fd) {
        var body =
            '<table style="width:100%"><tr font size="35"><th style="border: 2px solid black; width:5%" bgcolor=#D8D8D8>SNO</th><th style="border: 2px solid black" bgcolor=#D8D8D8>DESCRIPTION</th><th style="border: 2px solid black" bgcolor=#D8D8D8>TOTAL</th><th style="border: 2px solid black" bgcolor=#D8D8D8>PASSED</th><th style="border: 2px solid black" bgcolor=#D8D8D8>FAILED</th><th style="border: 2px solid black" bgcolor=#D8D8D8>SKIPPED</th>';
        var logo = '<table style="width:100%"><tr font size="35"><td width:15%"><img src="http://flossdental.com/wp-content/uploads/2017/10/delta-dental-plans-association_logo_5829-1024x205.jpg" height="100" width="200"></img></td><td width:70%><h1 style="font-family: Georgia; color:#DD4A17;">TEST AUTOMATION RESULTS</h1></td><td width:15%"><img src="https://www.hcltech.com/sites/default/files/styles/large/public/images/guideline_based1.png?itok=JdASqCkG" height="100" width="200"></img></td></tr>';

        var html =
            "<!DOCTYPE html>" +
            "<html><header>" +
            "</header><body>" +
            logo +
            "<table style='border: 2px solid black width:100%';border: 1px solid black>" +
            body +
            buildHtml(ff) +
             "<tr><td style='border: 1px solid black; width:5%' align='center'>" 
             +" "+
            "<td style='border: 1px solid black; font-family: Georgia' bgcolor=#EBF827>" 
            +"TOTAL SUMMARY "+
            "</td><td style='border: 1px solid black' align='center'>" +
            total +
            pass +
            passed +
            fail +
            failed +
            "<td style='border: 1px solid black' bgcolor=#EBF827 align='center'>"+
            (((passed/total)*100).toFixed(2))
             +"%"+
            "</td></tr>"+           
            "</table></body></html>";

        stream.end(html);
    });
});

function buildHtml(req) {
    var header = "";
     total = 0;
     passed = 0;
     failed = 0;
    return req.reduce(function(p, c, i) {
        total = total + Number(c.total);
        passed = passed + (Number(c.total) - Number(c.failed) - Number(c.skipped));
        failed = failed + Number(c.failed);

        

        if ((Number(c.total) - Number(c.failed) - Number(c.skipped)) > 0) {
            pass = "<td style='border: 1px solid black' bgcolor=#81F79F align='center'>"
        } else {
            pass = "<td style='border: 1px solid black' align='center'>"
        }
        if (Number(c.failed) > 0) {
            fail = "</td><td style='border: 1px solid black' bgcolor=#FA5858 align='center'>"
        } else {
            fail = "</td><td style='border: 1px solid black' align='center'>"
        }
        if (Number(c.skipped) > 0) {
            skip = "</td><td style='border: 1px solid black' bgcolor=#FA5858 align='center'>"
        } else {
            skip = "</td><td style='border: 1px solid black' align='center'>"
        }


        return (
            p +
            "<tr><td style='border: 1px solid black; width:5%' align='center'>" +
            (i + 1) +
            "<td style='border: 1px solid black; font-family: Georgia'>" +
            c.description.toUpperCase() +
            "</td><td style='border: 1px solid black' align='center'>" +
            c.total +
            pass +
            (Number(c.total) - Number(c.failed) - Number(c.skipped)) +
            fail +
            c.failed +
            skip +
            c.skipped +
            "</td><td>"
        );

    }, "");


}

function extension(element) {
    var extName = path.extname(element);
    return extName === ".html";
}

function getFile(filename) {
    return fs.readFileAsync('./results/' + filename, 'utf8');
}

/** New Code  */
function getFiles(dir) {
    // read all json files in the directory, filter out those needed to process, and using Promise.all to time when all async readFiles has completed. 
    return new Promise((resolve, reject) => {
        var summaryFiles = [];
        fs.readdirAsync(dir).then(function(filenames) {
            filenames = filenames.filter(extension);
            // console.log(filenames);
            return Promise.all(filenames.map(getFile));
        }).then(function(files) {

            files.forEach(function(file) {
                var reportData = {};
                var str = JSON.stringify(file);

                str.replace(/<header><h2>(.*?)<\/h2>/g, function(
                    match,
                    description
                ) {
                    reportData.description = description;
                    str.replace(/Tests: <strong>(.*?)<\/strong>/g, function(
                        match,
                        total
                    ) {
                        reportData.total = total;

                        str.replace(/Skipped: <strong>(.*?)<\/strong>/g, function(
                            match,
                            skipped
                        ) {
                            // console.log(skipped);
                            reportData.skipped = skipped;

                            str.replace(
                                /Failures: <strong>(.*?)<\/strong>/g,
                                function(match, failed) {
                                    // console.log(failed);
                                    reportData.failed = failed;
                                    // return reportData;
                                }
                            );
                        });
                    });
                });

                summaryFiles.push(reportData);
            });
            resolve(summaryFiles);
        });
    });
}