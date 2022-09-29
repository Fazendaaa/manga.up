"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const manifestPath = "dist/manifest.json";

const icons = JSON.parse(fs.readFileSync("public/icons.json"));
const manifest = JSON.parse(fs.readFileSync(manifestPath));

// Update to icons generate by PWA Builder
manifest.icons = [...manifest.icons, ...icons.icons];

fs.writeFileSync(manifestPath, JSON.stringify(manifest));
