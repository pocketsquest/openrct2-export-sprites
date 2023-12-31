const robot = require("robotjs"); // npm install robotjs

// Function to simulate mouse click at a specific location
function simulateMouseClick(x, y) {
  robot.moveMouseSmooth(x, y);
  robot.mouseClick();
}

// Function to capture text at a specific location
function captureText(x, y, width, height) {
  const screenshot = robot.screen.capture(x, y, width, height);
  return OCR(screenshot.image); // Replace OCR with your preferred method for text recognition
}