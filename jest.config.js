"use strict";

module.exports = {
    notify : true,

    setupFilesAfterEnv : [
        "<rootDir>/test/expect/toMatchDiffSnapshot.js",
    ],

    snapshotSerializers : [
        require.resolve("snapshot-diff/serializer.js"),
    ],
};
