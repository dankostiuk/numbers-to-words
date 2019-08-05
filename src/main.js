const readline = require("readline");
const Converter = require("./convert");

/*
 * Uses readline to map input to process.stdin and
 * output to process.stdout
 */
processInput = () => {
  let converter = new Converter();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  console.log("Please enter numeric values (e.g. 4321) or 'q' to quit: ");

  rl.on("line", line => {
    if (line === "q") {
      console.log("Goodbye!");
      rl.close();
      process.exit(); // exit process indicating non-error
    }
    console.log(converter.convertNumberToWords(line));
  });
};

processInput();
