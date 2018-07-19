var data1 = [{ specialty: "Oral Surgeon" }, { specialty: "Oral Surgeon" }, { specialty: "Oral Surgeon" }, { specialty: "Oral Surgeon" }, { specialty: "Oral Surgeon" }, { specialty: "General Dentist" }, { specialty: "General Dentist" }, { specialty: "General Dentist" }, { specialty: "General Dentist" }, { specialty: "General Dentist" }, { specialty: "General Dentist" }]

function getValueCount(data, key) {
    var oCount = 0;
    var gCount = 0;
    data.forEach(function(bb) {
        if (bb.specialty == "Oral Surgeon") {
            oCount++;
        }
        if (bb.specialty == "General Dentist") {
            gCount++
        }
    });
    return {
        OralSurgeon: oCount,
        GeneralDentist: gCount,
    }
}
console.log(getValueCount(data1, 'specialty').OralSurgeon)

// getCount(data1).then(function(aa) {
//     console.log("sdfdsfdsf"+aa)
// })
