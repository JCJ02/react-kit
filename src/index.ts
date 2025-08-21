#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const copyRecursiveSync = (src: string, dest: string) => {
  const stat = fs.statSync(src); // Get file system stats

  if (stat.isDirectory()) {
    // Ensure destination directory exists
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    // Loop through each file/folder inside src
    for (const file of fs.readdirSync(src)) {
      const currentSrc = path.join(src, file);
      const currentDest = path.join(dest, file);

      // Recursive call for subdirectories and files
      copyRecursiveSync(currentSrc, currentDest);
    }
  } else {
    // If it's a file, just copy it
    fs.copyFileSync(src, dest);
  }
};

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

  // Path to template inside package
  const templateDirectory = path.join(__dirname, "..", "template");

  if (!fs.existsSync(templateDirectory)) {
    console.error("❌ Template Folder not found inside package!");
    process.exit(1);
  }

  // Copy entire template folder
  copyRecursiveSync(templateDirectory, projectPath);

  // Install Dependencies
  console.log("📥 Installing dependencies...");
  execSync("npm install", { cwd: projectPath, stdio: "inherit" });

  console.log("✅ Done!");
  console.log(`- cd ${projectName}`);
  console.log("- npm run dev");
};

run();
