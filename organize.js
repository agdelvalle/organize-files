// const fs = require('fs');
const fs = require('fs-extra')

const input = "./photos";

const copy = input + "-copy";

if(!fs.existsSync(copy)){
    fs.mkdirSync(copy);
} else {
    console.log("exists")
}

fs.readdirSync(input).map(fileName => {
    // console.log(fileName)
    const path = input+"/"+fileName;
    fs.lstat(path, (err, stats) => {
        if(err){
            console.log(err)
        }

        console.log("birthtime is " + stats.birthtime);

        let birthString = stats.birthtime.toDateString();
        let birthSplit = birthString.split(" ");
        let month = birthSplit[1];
        let date = birthSplit[2];
        let year = birthSplit[3];

        let newYearFolder = copy + "/" + year;
        let newMonthFolder = newYearFolder + "/" + month + "/";
        let finalDest = newMonthFolder + date;

        // check if folder exists in copy and create folders as needed
        if(!fs.existsSync(newYearFolder)){
            fs.mkdirSync(newYearFolder)
            fs.mkdir(newMonthFolder)
            fs.mkdir(finalDest)
        } else {
            console.log(newYearFolder + " exists");
            if(!fs.existsSync(newMonthFolder)){
                console.log(month+" does not exist")
                fs.mkdirSync(newMonthFolder)
                fs.mkdir(finalDest)
            } else {
                console.log(year +" and " + month + " folders exist")
                if(!fs.existsSync(finalDest)){
                    fs.mkdir(finalDest)
                } else {
                    console.log(year + " and " + month + " and " + date + " folders exist")
                }
            }
        }
        // workaround for error when src is a filename and destination is a folder
        fs.copy(path, finalDest+"/"+fileName)
    }) 
})


