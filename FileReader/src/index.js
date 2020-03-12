function reaad(fileName, cb) {
    let infFile = fileName;

    let lineByLine = require('n-readlines');

    let liner = new lineByLine(infFile);

    let line;

    let a = [];

    while(line = liner.next()) {
        if(line != "") {
            a.push(`${line}`);
        }
    }

    let info = [];

    for(let i = 0; i != a.length; i++) {

        let it = a[i].split(": ");

        info.push({name: it[0], value: it[1]});

    }

    for(let b = 0; b != info.length; b++) {

        cb(fileName, b+1, info[b].name, info[b].value);

    }

}

function readMultipleFiles(listOfFiles, cb, s) {
    for(let i = 0; i != listOfFiles.length; i++) {

        reaad(listOfFiles[i], (fl, i2, name, value) => {
            cb(fl, i2, name, value);
        });

        if(s) console.log("-----------------------------");

    }
}

let fileSys = ['info.txt'];

readMultipleFiles(fileSys, (fl, i, name, value) => {

    console.log(`${fl} ${i} :: ${name} : ${value}`);

}, true);