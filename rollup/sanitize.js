const path = require("path");

module.exports = (file) =>
    path.basename(file, path.extname(file))
        .toLowerCase()
        .replace(/(?:\b|_)[a-z]/ig, (ltr) => ltr.toUpperCase())
        .replace(/[^a-z]/ig, "");
