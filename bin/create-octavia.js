#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const os = require("os");

const projectName = process.argv[2];

if (!projectName) {
  console.error("❌  لطفاً یک نام برای پروژه وارد کن. مثل:");
  console.error("    npx create-octavia-app my-project");
  process.exit(1);
}

const sourceDir = path.join(__dirname, "../starter-template");
const targetDir = path.join(process.cwd(), projectName);

if (!fs.existsSync(sourceDir)) {
  console.error("❌ پوشه starter-template پیدا نشد. لطفاً ساختار رو چک کن.");
  process.exit(1);
}

fs.cpSync(sourceDir, targetDir, { recursive: true });

console.log(`✅ پروژه \"${projectName}\" ساخته شد.`);
console.log(`📁 مسیر: ${targetDir}`);

console.log("📦 نصب پکیج‌ها...");
execSync("npm install", { stdio: "inherit", cwd: targetDir });

console.log("🚀 پروژه آماده‌ست! حالا اجرا کن:");
console.log(`    cd ${projectName}`);
console.log("    npm run dev");
