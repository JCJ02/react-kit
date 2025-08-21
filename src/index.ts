#!/usr/bin/env node

import fs from "fs";
import path from "path";

const projectName = process.argv[2];

if (!projectName) {
  console.log("❌ Please, Provide a Project Name!");
  process.exit(1);
}

const targetDir = path.join(process.cwd(), projectName);
const templateDir = path.join(__dirname, "template");

// Copy template folder into target folder
fs.cpSync(templateDir, targetDir, { recursive: true });

console.log(`✅ Your Project ${projectName} has been Created!`);
console.log("👣 Next Steps:");
console.log(` - cd ${projectName}`);
console.log(" - npm install");
console.log(" - npm run dev");
