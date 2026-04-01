import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env");

let env;
try {
  env = Object.fromEntries(
    readFileSync(envPath, "utf8")
      .split("\n")
      .filter(line => line.includes("="))
      .map(line => { const i = line.indexOf("="); return [line.slice(0, i).trim(), line.slice(i + 1).trim()]; })
  );
} catch {
  console.log("Error: .env file not found. Run `node scripts/setup.mjs` first.");
  process.exit(1);
}

const BASE_URL  = env.JIRA_BASE_URL;
const EMAIL     = env.JIRA_EMAIL;
const API_TOKEN = env.JIRA_API_TOKEN;

if (!BASE_URL || !EMAIL || !API_TOKEN) {
  console.log("Error: JIRA_BASE_URL, JIRA_EMAIL, and JIRA_API_TOKEN must all be set in .env");
  process.exit(1);
}

const AUTH = "Basic " + Buffer.from(`${EMAIL}:${API_TOKEN}`).toString("base64");

const res = await fetch(`${BASE_URL}/rest/api/3/myself`, {
  headers: { Authorization: AUTH, Accept: "application/json" },
});

if (res.ok) {
  const { displayName } = await res.json();
  console.log(`Connection successful - logged in as: ${displayName}`);
} else {
  const text = await res.text();
  console.log(`Connection failed: ${res.status} ${res.statusText} - ${text}`);
}
