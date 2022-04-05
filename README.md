# Log parser app
This is a command line node.js application, with typescritp, which parses the input .log file, to an output .json file, looking for errors.

## Usage
1. Install dependencies
npm install
2. Compile files
npx tsc
3. Execute cmd
node parser.js --input ./app.log --output ./errors.json

## Test
In order to execute tests, do:
- npm test