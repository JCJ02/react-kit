#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const copyRecursiveSync = (src: string, dest: string) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, {
      recursive: true,
    });
  }

  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

const run = async () => {
  const args = process.argv.slice(2);
  const projectName = args[0] || "." || "./";

  const projectPath =
    projectName === "." || "./"
      ? process.cwd()
      : path.resolve(process.cwd(), projectName);

  if (projectName !== "." && fs.existsSync(projectPath)) {
    console.error(`❌ Folder "${projectName}" already exists!`);
    process.exit(1);
  } else if (projectName !== "./" && fs.existsSync(projectPath)) {
    console.error(`❌ Folder "${projectName}" already exists!`);
    process.exit(1);
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
    projectName === "." ? "- npm run dev" : `- cd ${projectName}\n- npm run dev`
  );
};

run();
