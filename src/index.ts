#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const run = async () => {
  const args = process.argv.slice(2);
  const projectName = args[0];

  if (!projectName) {
    console.error("❌ Please Provide a Project Name.");
    process.exit(1);
  }

  const projectPath = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`❌ Folder "${projectName}" already exists!`);
    process.exit(1);
  }

  console.log(`📦 Creating Project: ${projectName}...`);

  // Use template inside package
  const templateDirectory = path.join(__dirname, "..", "template");

  if (!fs.existsSync(templateDirectory)) {
    console.error("❌ Template Folder not found inside package!");
    process.exit(1);
  }

  fs.copyFileSync(templateDirectory, projectPath);

  // Install Dependencies
  console.log("📥 Installing dependencies...");
  execSync("npm install", { cwd: projectPath, stdio: "inherit" });

  console.log("✅ Done!");
  console.log(`- cd ${projectName}`);
  console.log("- npm run dev");
};

run();
