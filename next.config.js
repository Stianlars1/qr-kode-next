/**
 * @type {import('next').NextConfig}
 */

const path = require("path");

module.exports = {
  output: "export",
  distDir: "build",

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
