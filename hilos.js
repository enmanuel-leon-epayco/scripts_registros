const util = require("util");
const exec = util.promisify(require("child_process").exec);

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
  const start = parseInt(process.argv[2]);
  const end = parseInt(process.argv[3]);
  for (let index = start; index <= end; index++) {
    console.log(`Lote ${index}: Start`);
    const command = `node index.js lotes_json/${index}.json >> out/run_1120/Lote_${index}.csv`;
    await runCommand(command, index);
  }
  //runCommand("npm run lotes >> out/Lotes.csv")
};
run();
