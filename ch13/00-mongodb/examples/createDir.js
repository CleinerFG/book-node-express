const pathUtils = require("path");
const fs = require("fs");

const dataDir = pathUtils.resolve(__dirname, "data");

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

