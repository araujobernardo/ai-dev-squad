import { createInterface } from "readline";
import { writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

console.log("\n=== AI Dev Squad — Setup Wizard ===\n");

const projectName  = await ask("Project name (e.g. My Finance App): ");
const jiraBaseUrl  = await ask("Jira base URL (e.g. https://mycompany.atlassian.net): ");
const jiraEmail    = await ask("Jira email: ");
const jiraToken    = await ask("Jira API token: ");
const projectKey   = await ask("Jira project key (e.g. FA): ");
const githubRepo   = await ask("GitHub repo URL (e.g. https://github.com/you/repo): ");

rl.close();

// Write .env
const envPath = resolve(__dirname, "../.env");
const envContent = [
  `JIRA_BASE_URL=${jiraBaseUrl.trim()}`,
  `JIRA_EMAIL=${jiraEmail.trim()}`,
  `JIRA_API_TOKEN=${jiraToken.trim()}`,
  `JIRA_PROJECT_KEY=${projectKey.trim().toUpperCase()}`,
  `GITHUB_REPO=${githubRepo.trim()}`,
].join("\n") + "\n";

writeFileSync(envPath, envContent, "utf8");
console.log("\n✓ .env file created");

// Update CLAUDE.md
const claudePath = resolve(__dirname, "../CLAUDE.md");
let claudeMd = readFileSync(claudePath, "utf8");
claudeMd = claudeMd.replaceAll("[YOUR_PROJECT_NAME]", projectName.trim());
writeFileSync(claudePath, claudeMd, "utf8");
console.log(`✓ CLAUDE.md updated with project name: ${projectName.trim()}`);

// Test Jira connection
console.log("\nTesting Jira connection...");
try {
  execSync("node scripts/test-jira-connection.mjs", {
    cwd: resolve(__dirname, ".."),
    stdio: "inherit",
  });
} catch {
  console.log("\nSetup complete, but Jira connection test failed.");
  console.log("Check your credentials in .env and re-run: node scripts/test-jira-connection.mjs");
  process.exit(1);
}

console.log("\n=== Setup complete! ===\n");
console.log("Next steps:");
console.log("  1. Add your requirements to docs/requirements.md");
console.log("  2. Open Claude Code and say: \"You are the Product Owner. Read docs/requirements.md and propose an Epic and Story breakdown.\"");
console.log("  3. Once stories are in Jira, say: \"Pick up the next ticket\" to start the Delivery Lead.\n");
