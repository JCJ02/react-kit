#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { copyRecursiveSync } from "./utilities/copy-recursive-sync";

const run = async () => {
  const args = process.argv.slice(2);
  const folder = args[0];

  let projectName = folder || ".";

  const projectPath =
    projectName === "." || projectName === "./"
      ? process.cwd()
      : path.resolve(process.cwd(), projectName);

  const isCurrentDirectory =
    projectName === "." || projectName === "./" || !folder;

  if (!isCurrentDirectory && fs.existsSync(projectPath)) {
    console.error(`❌ Folder "${projectName}" already exists!`);
    process.exit(1);
  }

  if (!isCurrentDirectory) {
    fs.mkdirSync(projectPath, { recursive: true });
  }

  console.log("Welcome to React Kit Folder Structure!!!");
  console.log(`📦 Creating Project in: ${projectPath}...`);

  // Use template inside package
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
  console.log(
    isCurrentDirectory ? "- npm run dev" : `- cd ${projectName}\n- npm run dev`
  );
};

run();
