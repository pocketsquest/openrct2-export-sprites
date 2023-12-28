// Helper function to parse JSON from stdout
function extractOffsets(stdout) {
  const regex = /\{[^{}]*\},/g; // Updated with 'g' flag for global search
  let matches = [];
  let match;

  while ((match = regex.exec(stdout)) !== null) {
    matches.push(match[0]);
  }

  return matches.length > 0 ? matches.join('') : null;
}

const inputString = '{"prop1":"val1","prop2":"val2"},\r\n{"prop1":"val3","prop2":"val4"},\r\nMore text here.';
const result = extractOffsets(inputString);
console.log(result);