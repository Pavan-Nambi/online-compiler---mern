const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
const js = (filepath) => {
  const Id = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${Id}`);
  return new Promise((resolve, reject) => {
    exec(`node ${filepath}`, (error, stdout, stderr) => {
      error && reject({ error, stderr });
      stderr && reject(stderr);
      resolve(stdout);
    });
  });
};
module.exports = {
  js,
};
