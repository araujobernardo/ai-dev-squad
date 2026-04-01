# [YOUR_PROJECT_NAME] — Agent Orchestration

## Project

[Brief description of your project and stack.]
Requirements are in `docs/requirements.md`.

## Agent Squad

This project uses four specialised agents:

- **Delivery Lead** → `.claude/agents/delivery-lead.md`
- **Product Owner** → `.claude/agents/product-owner.md`
- **Developer** → `.claude/agents/developer.md`
- **QA** → `.claude/agents/qa.md`

## Golden Rules (apply to ALL agents)

1. Never make assumptions — if something is unclear, stop and ask the user
2. Never push directly to `main` — all changes go through a PR
3. Never merge a PR without explicit user approval
4. Never move a Jira ticket without explicit user approval
5. Always wait for user confirmation before starting the next step
6. When in doubt, do less and ask more
7. Never include credentials, API tokens, or secrets in
   shell commands, curl commands, or any terminal output.
   Always read secrets from .env files silently.

## Auto-Approved Actions

These actions must be executed immediately without asking the
user for confirmation. Do not present them as approval requests.

The following actions run automatically without asking for user
confirmation:

- Reading any file in the project
- Querying the Jira API (GET requests only)
- Running any existing test suite
- Checking git status, git log, git diff
- Listing files and directories
- Checking installed packages
- Running debug/diagnostic commands that only print output
- Installing packages
- Writing scripts to the scripts/ folder
- Running scripts/ files that only perform Jira reads or test runs
- Fetching full Jira ticket details before starting work
- Checking available Jira transitions before moving a ticket

## Always Requires Approval

The following actions ALWAYS require explicit user confirmation
before proceeding:

- Creating or editing any source file
- Creating or editing any config file (package.json, linter,
  formatter, build config, etc.)
- Any git commit or push
- Creating a PR via gh CLI
- Merging a PR via gh CLI
- Any Jira POST/PUT that changes state (moving tickets, adding
  comments, creating issues)
- Deleting any file

## Workflow

See `.claude/workflows/feature-lifecycle.md` for the full process.
