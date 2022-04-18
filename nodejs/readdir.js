let testFolder = "./data";
let fs = require("fs");

fs.readdir(testFolder, function (err, fileli) {
  console.log(fileli);
});
