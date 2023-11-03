require("dotenv").config();
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { START, END } = process.env;

async function runCommand(command, lote) {
  const { stdout, stderr, error } = await exec(command);
  if (stderr) {
    console.error("stderr:", stderr);
  }
  if (error) {
    console.error("error:", error);
  }
  console.log(`Lote ${lote}: Finish`);
  return stdout;
}

const run = async () => {
  const start = parseInt(START);
  const end = parseInt(END);
  for (let index = start; index <= end; index++) {
    console.log(`Lote ${index}: Start`);
    const command = `node index.js lotes_json/${index}.json >> out/Lote_${index}.csv`;
    await runCommand(command, index);
  }
};
run();
