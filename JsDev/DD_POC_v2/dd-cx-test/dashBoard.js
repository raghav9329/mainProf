var fs                 = require("fs");
var os                 = require("os");
var moment             = require('moment');
var runnerHostName     = os.hostname();
var metadata           = require('./metadata.json');
var endtime            = moment().format("MM/DD/YYYY HH:mm:ss");
var testSuiteStartTime = metadata.testSuiteStartTime;
var cmdLineFileData    = metadata.executionCommand;
var ms                 = moment(endtime, "MM/DD/YYYY HH:mm:ss").diff(moment(testSuiteStartTime, "MM/DD/YYYY HH:mm:ss"));
var d                  = moment.duration(ms)
var s                  = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
var externalDuration   = (((1440 * d.days()) + (60 * d.hours()) + (d.minutes())+(d.seconds()/60))).toFixed(2);

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

fs.statAsync = function(filename, enc) {
    return new Promise(function(resolve, reject) {
        fs.stat('./results/' + filename, function(err, data) {
            // console.log("fData+data.mtime" + data.mtime);
            // return dd.toString() + data.mtime;
            if (err)
                reject(err);
            else
                resolve(data);

        })
    });
};

module.exports = fs;

var moment = require('moment');
var path = require("path");
getFiles("./results").then(function(ff) {

    var fileName = "./dashboardNGTA.html";
    // var fileName = "./ddTestAutomationResultsDashboard"+moment().format('MM_DD_YYYY_h_mm_ss')+".html";
    var stream = fs.createWriteStream(fileName);
    stream.once("open", function(fd) {
        var body =
            '<table style="width:100%; position: absolute;left: 0%;right: 30%;top: 60%;"><tr font size="35"><th style="border: 2px solid black; width:5%" bgcolor=#D8D8D8>SNO</th><th style="border: 2px solid black" bgcolor=#D8D8D8>DESCRIPTION</th><th style="border: 2px solid black" bgcolor=#D8D8D8>EXECUTION TIME (s)</th><th style="border: 2px solid black" bgcolor=#D8D8D8>TOTAL</th><th style="border: 2px solid black" bgcolor=#D8D8D8>PASSED</th><th style="border: 2px solid black" bgcolor=#D8D8D8>FAILED</th><th style="border: 2px solid black" bgcolor=#D8D8D8>SKIPPED</th><th style="border: 2px solid black" bgcolor=#D8D8D8>REPORT</th>';
        var logo = '<table style="width:100%;position: absolute;top: 0%;"><tr><td width:15%"><img src="http://flossdental.com/wp-content/uploads/2017/10/delta-dental-plans-association_logo_5829-1024x205.jpg" height="100" width="180"></img></td><td width:70%><h2 style="font-family: Georgia; color:#DD4A17;">TEST AUTOMATION RESULTS<h2><h2 style="font-family: Arial; color:#AF7AC5;">' + 'LAST UPDATED AT:- ' + (moment().format('lll')).toString().toUpperCase() + '</h2></td><td width:15%"><img src="https://www.hcltech.com/sites/default/files/styles/large/public/images/guideline_based1.png?itok=JdASqCkG" height="100" width="180"></img></td></tr>';

        var html =
            "<!DOCTYPE html>" +
            "<html>" +
            "<head>" +
            "<script src='https://cdn.zingchart.com/zingchart.min.js'></script>" +
            "<style>#myDIV {width: 100%;padding: 50px 0;text-align: center;background-color: lightblue; margin-top: 20px;" +
            "}" +

            ".modal {    display: none;    position: fixed;    z-index: 1;    padding-top: 100px;    left: 0;    top: 0;    width: 100%;    height: 100%;    overflow: auto;    background-color: rgb(0,0,0);    background-color: rgba(0,0,0,0.4);}" +
            ".modal-content {  overflow: auto;height: 70%;  background-color: #fefefe;    margin: auto;    padding: 20px;    border: 1px solid #888;    width: 80%;}" +
            ".close {    color: #aaaaaa;    float: right;    font-size: 28px;    font-weight: bold;}" +
            ".close:hover,.close:focus {    color: #000;    text-decoration: none;    cursor: pointer;}" +
            ".modal-content .close {    position: fixed;    top: 17%;    right: 100px;    width: 30px;    height: 30px;      border-radius: 23px;  background-color:red;  color: #ffe300;     color: #000;    float: right;    font-size: 28px;    font-weight: bold;}" +
            ".button {    background-color: #3f51b5;   margin: 4px 2px;  border: none;  width: 90%;  border-radius: 20px;  color: white;    padding: 8px 10px;    text-align: center;   font-size: 15px;    cursor: pointer;}" +
            "</style>" +
            "</head>" +
            "<body>" +
            logo +

            "<table style='border: 2px solid black width:100%';border: 1px solid black>" +
            body +
            buildHtml(ff) +
            "</table>" +

            "<center><div id='piechart' style='position: absolute;left: 60%;right: 5%;top: 15%;'></div></center>" +

            "<script type='text/javascript' src='https://www.gstatic.com/charts/loader.js'></script>" +

            "<script type='text/javascript'>" +
            // Load google charts
            "google.charts.load('current', {'packages':['corechart']});" +
            "google.charts.setOnLoadCallback(drawChart);" +

            // Draw the chart and set the chart values
            "function drawChart() {" +
            "var data = google.visualization.arrayToDataTable([" +
            "['status', 'number']," +
            "['Passed', " + passed + "]," +
            "['Failed', " + failed + "]]);" +

            // Optional; add a title and set the width and height of the chart
            "var options = {'title':'Summarised Test Results'};" +

            // Display the chart inside the <div> element with id="piechart"
            "var chart = new google.visualization.PieChart(document.getElementById('piechart'));" +
            "chart.draw(data, options);}</script>" +

            "<script>" +
            "function closeModal(id) {" +
            "var x = document.getElementById(id).nextSibling;" +
            "x.style.display = 'none';" +
            "};" +
            "function myFunction(id) {" +
            "var modal = document.getElementById(id).nextSibling;" +
            "modal.style.display = 'block';" +
            "}" +

            "</script>" +
            "<div style='position: absolute;left: 4%;;top: 16%;'>" +
            "<table id ='suitedata' width='500' style='border: 1px solid black';'><tbody>" +
            "<tr><td width='180' style='border: 1px solid black' bgcolor=#D8D8D8><font size='2'>Total Tests: </td><td id='totaltests' style='border: 1px solid black' bgcolor=#D8D8D8><font size='2'>" + total + "</td></tr>" +
            "<tr><td style='border: 1px solid black'><font size='2'>Total Pass: </td><td id='totalpassed' style='border: 1px solid black' bgcolor=#81F79F><font size='2'>" + passed + "</td></tr>" +
            "<tr><td style='border: 1px solid black' bgcolor=#D8D8D8><font size='2'>Total Fail: </td><td id='totalfail' style='border: 1px solid black' bgcolor=#FA5858><font size='2'>" + failed + "</td></tr>" +
            "<tr><td style='border: 1px solid black'><font size='2'>Test Runner Host Name: </td><td id='runnerhostname' style='border: 1px solid black'><font size='2'>" + runnerHostName + "</td></tr>" +
            "<tr><td style='border: 1px solid black' bgcolor=#D8D8D8><font size='2'>Command To Execute: </td><td id='cmdlinefiledata' style='border: 1px solid black'><font size='2'>" + cmdLineFileData + "</td></tr>" +
            "<tr><td style='border: 1px solid black'><font size='2'>Test Suite Start Time: </td><td id='testsuitestarttime' style='border: 1px solid black'><font size='2'>" + testSuiteStartTime + "</td></tr>" +
            "<tr><td style='border: 1px solid black' bgcolor=#D8D8D8><font size='2'>Test Suite End Time: </td><td id='testsuiteendtime' style='border: 1px solid black'><font size='2'>" + endtime + "</td></tr>" +
            "<tr><td style='border: 1px solid black'><font size='2'>External Duration Time: </td><td id='externalduration' style='border: 1px solid black'><font size='2'>" + externalDuration + ' Min' + "</td></tr>" +
            "<tr><td style='border: 1px solid black' bgcolor=#D8D8D8><font size='2'>Internal Duration Time: </td><td id='internalduration' style='border: 1px solid black'><font size='2'>" +((moment.duration(internalexecutiontime*1000).minutes())+((moment.duration(internalexecutiontime*1000).seconds())/60)).toFixed(2) + ' Min' +"</td></tr>" +


            "</tbody></table>"
        "</div>" +
        "</body></html>";

        stream.end(html);
    });
});

function buildHtml(req) {
    var header = "";
    total = 0;
    passed = 0;
    failed = 0;
    internalexecutiontime = 0;
    return req.reduce(function(p, c, i) {
        total = total + Number(c.total);
        internalexecutiontime = internalexecutiontime + c.executionTime;
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
            "<td style='border: 1px solid black; font-family: Verdana; font-size:13px'>" +
            // "<a href='javascript:void(0);' onclick='myFunction('"+i+"')' >"+
            c.description.toUpperCase() +
            // "</a>"+
            "</td><td style='border: 1px solid black' align='center'>" +
            c.executionTime +
            "</td><td style='border: 1px solid black' align='center'>" +
            c.total +
            pass +
            (Number(c.total) - Number(c.failed) - Number(c.skipped)) +
            fail +
            c.failed +
            skip +
            c.skipped +
            "<td style='border: 1px solid black' align='center'>" +

            "<button class='button' id='" + i + "' onclick='myFunction(this.id)'>View</button>" +


            "<div id='myModal' class='modal'>" +

            "<div class='modal-content'>" +
            "<span id='" + i + "' class='close' onclick='closeModal(this.id)'>&times;</span>" +
            c.body +
            "</div>" +

            "</div>" +

            "</td></tr>"
        );

    }, "");

}


//c.body
function extension(element) {
    var extName = path.extname(element);
    return extName === ".html";
}

function getFile(filename) {
    var htmlData = {};
    return fs.readFileAsync('./results/' + filename, 'utf8')
        .then(function(dd) {
            htmlData = dd;
            return fs.statAsync(filename);
        }).then(function(aa) {
            return htmlData + "&%$" + (moment(aa.mtime).format("MM-DD-YYYY, hh:mm a"));
        })
}

/** New Code  */
function getFiles(dir) {
    // read all json files in the directory, filter out those needed to process, and using Promise.all to time when all async readFiles has completed. 
    return new Promise((resolve, reject) => {
        var summaryFiles = [];
        fs.readdirAsync(dir).then(function(filenames) {
            filenames = filenames.filter(extension);

            return Promise.all(filenames.map(getFile));
        }).then(function(files) {

            files.forEach(function(file) {

                var reportData = {};
                var str = JSON.stringify(file);
                // console.log("=====" + JSON.stringify(file))
                str.replace(/<header><h2>(.*?)<\/h2>/g, function(
                    match,
                    description
                ) {
                    var eDate = (file.toString().split("&%$"))[1];
                    var tDes = description.slice(0, -10);
                    // console.log("time=="+description.slice(-8).replace('-',''))
                    // console.log("des===="+(description + eDate))
                    reportData.executionTime = Number(description.slice(-8).replace('-', '').slice(0, -1));
                    reportData.description = tDes + eDate;
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
                            reportData.body = file;

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