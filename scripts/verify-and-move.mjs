import fs from 'fs';
import path from 'path';

const filePath = 'C:/Users/HP/tripzy/src/App.css';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split(/\r?\n/);

console.log("Total lines in file:", lines.length);

// 1-indexed line 2019 is index 2018.
const startIdx = 2018;
// 1-indexed line 2321 is index 2320.
const endIdx = 2321; // slice is non-inclusive, so index 2018 to 2320 (lines 2019 to 2321)

console.log("Line 2019 (index 2018):", lines[2018]);
console.log("Line 2020 (index 2019):", lines[2019]);
console.log("Line 2021 (index 2020):", lines[2020]);
console.log("---");
console.log("Line 2321 (index 2320):", lines[2320]);
console.log("Line 2322 (index 2321):", lines[2321]);
console.log("Line 2323 (index 2322):", lines[2322]);

// Perform safety checks before moving
const isStartCorrect = lines[2018].includes("/* ============================================") && lines[2019].includes("Responsive");
const isEndCorrect = lines[2320] === "}" && lines[2322].includes("/* ============================================") && lines[2323].includes("Tripzy Logo");

if (isStartCorrect && isEndCorrect) {
  console.log("Verification successful! Moving block...");
  const responsiveBlock = lines.slice(startIdx, endIdx);
  
  // Remove the block from its current position
  lines.splice(startIdx, endIdx - startIdx);
  
  // Append a blank line, then the responsive block at the end
  lines.push("");
  lines.push(...responsiveBlock);
  
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log("Successfully moved responsive block to the end of App.css!");
} else {
  console.error("Verification failed! Lines do not match expected responsive block structure.");
}
