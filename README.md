# Coding Assignment - Convert Numeric Values to English Word Equivalents

Here you can find my implementation of your coding assignment - I chose to write it in JS.

## Running the program

It is assumed that the system running my code will have node and npm installed. If this isn't the case, please visit https://nodejs.org/en/download and install them.

If the system has node + npm installed, one can follow the steps below:

1. Clone the git repository.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the REPL environment to process user inputs. Output for each entered value will be seen as stdout. To quit the program, the user can enter 'q'.
4. Tests can be run with `npm test` and code coverage can be viewed by running `npm run coverage`.

## Design

Running `npm start` will run logic in `main.js` to start the REPL environment and process user input, calling the `Converter` class for each value entered that isn't the quit sentinel ('q'). The corresponding output can be seen for each value entered.

In the `Converter` class, `convertNumberToWords` first validates the user input to ensure the value is purely numeric and lies within the permitted range. Next, I decided to iterate in reverse over the inputted value (from last index to first index) to build the appropriate string of words, prepending to the existing result in every iteration. Finally, I added logic to identify where to place any 'and' keywords in `formatResultString`. This method also cleans any blank spaces and prepends the 'Negative' keyword if the originating value was negative.
