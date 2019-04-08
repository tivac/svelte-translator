"use strict";

module.exports = {
    notify : true,

    setupFilesAfterEnv : [
        "<rootDir>/test/expect/toMatchDiffSnapshot.js",
    ],

    snapshotSerializers : [
        "snapshot-diff/serializer.js",
        "jest-serializer-html",
    ],

    transform : {
        "^.+\\.svelte$" : "<rootDir>/test/transforms/svelte.js",
        "^.+\\.html$"   : "<rootDir>/test/transforms/html.js",
        "^.+\\.js$"     : "babel-jest",
    },

    transformIgnorePatterns : [
        "/node_modules/(?!(svelte2/))",
        "/test/",
    ],

    coveragePathIgnorePatterns : [
        "/node_modules/",
        "/specimens/",
    ],
};
