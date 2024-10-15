const fs = require("fs");
const path = require("path");

// Base directory of the app
const appDir = path.join(__dirname, "app");

// Helper to recursively get all files in a directory
function getFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      files = files.concat(getFiles(filePath));
    } else {
      files.push(filePath);
    }
  });
  return files;
}

// Function to convert file path to route
function getRouteFromPath(filePath) {
  // Remove the base app directory and extension (.js, .jsx, .ts, .tsx)
  let relativePath = filePath
    .replace(appDir, "")
    .replace(/\.(js|jsx|ts|tsx)$/, "");

  // Ignore _layout, _error, and files inside folders with _
  if (relativePath.includes("_")) return null;

  // Remove groupings like (tabs)
  relativePath = relativePath.replace(/\([^)]+\)/g, "");

  // Replace dynamic segments [param] with :param
  relativePath = relativePath.replace(/\[([^\]]+)\]/g, ":$1");

  // Handle index files - remove '/index' from the final route
  if (relativePath.endsWith("/index")) {
    relativePath = relativePath.replace("/index", "");
  }

  return relativePath || "/"; // Root index should be '/'
}

// Get all files in the app directory
const allFiles = getFiles(appDir);

// Filter and map the files to URLs
const routes = allFiles
  .filter((file) => /\.(js|jsx|ts|tsx)$/.test(file)) // Only consider JS/TS files
  .map(getRouteFromPath)
  .filter(Boolean) // Remove nulls
  .map((route) => route.replace(/\\/g, "/")) // Replace Windows backslashes with forward slashes
  .map((route) => route.replace(/\/+/g, "/")); // Remove double slashes

console.log("Generated Routes:", routes);
