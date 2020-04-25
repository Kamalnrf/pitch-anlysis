const util = require("util");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);

async function generatePitchData(fileArgument) {
  try {
    const { stdout } = await exec("aubio pitch " + fileArgument);
    return stdout;
  } catch (e) {
    console.log(e);
  }
}

function transaformPitchDataToJSON(data) {
  return JSON.stringify(data.split("\n").map((i) => i.split("\t")));
}

async function writeToFile(generatePitchData, argument) {
  try {
    const fileName = process.argv[2].split("/");

    fs.writeFileSync(
      `songData-${fileName[fileName.length - 1]}.json`,
      transaformPitchDataToJSON(await generatePitchData(argument)),
      "utf-8"
    );

    console.log("DONE WRITING TO THE FILE");
  } catch (e) {
    console.log(e);
  }
}

writeToFile(generatePitchData, process.argv[2]);
