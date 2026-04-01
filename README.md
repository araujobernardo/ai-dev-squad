# AI Dev Squad

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)](https://nodejs.org)
[![Powered by Claude Code](https://img.shields.io/badge/Powered%20by-Claude%20Code-blueviolet)](https://claude.ai/code)

A ready-to-use template that gives your project a four-agent AI development team — Product Owner, Developer, QA Engineer, and Delivery Lead — all powered by Claude Code. Drop it into any codebase, run a two-minute setup wizard, and your agents will plan features, write code, review pull requests, and manage your Jira board while you stay in control of every decision that matters.

---

## The Squad

```
┌─────────────────────────────────────────────────────┐
│                    You (the user)                   │
│         approve stories · review PRs · merge        │
└────────┬──────────────┬──────────────┬──────────────┘
         │              │              │
         ▼              ▼              ▼
  ┌─────────────┐       │       ┌─────────────┐
  │ Product     │       │       │     QA      │
  │ Owner       │       │       │  Engineer   │
  │             │       │       │             │
  │ Turns your  │       │       │ Reviews PRs,│
  │ requirements│       │       │ writes tests│
  │ into Jira   │       │       │ & reports   │
  │ stories     │       │       │ findings    │
  └─────────────┘       │       └─────────────┘
                        ▼
               ┌─────────────────┐
               │  Delivery Lead  │
               │                 │
               │ Coordinates the │
               │ squad end-to-end│
               │ story by story  │
               └────────┬────────┘
                        │
                        ▼
               ┌─────────────────┐
               │    Developer    │
               │                 │
               │ Implements      │
               │ stories on      │
               │ feature branches│
               └─────────────────┘
```

---

## Prerequisites

- [Claude Code](https://claude.ai/code) — the CLI that runs the agents
- [Node.js](https://nodejs.org) v18 or later
- [GitHub CLI](https://cli.github.com) — for PR creation and merging (`gh auth login`)
- A GitHub repository for your project
- A Jira account — the [free tier](https://www.atlassian.com/software/jira) is enough

---

## Quick Start

```bash
# 1. Clone the template into your project folder
git clone https://github.com/[YOUR_GITHUB_USERNAME]/ai-dev-squad my-project && cd my-project

# 2. Run the setup wizard — takes about two minutes
node scripts/setup.mjs

# 3. Open Claude Code and start the Delivery Lead
# "Pick up the next ticket."
```

That's it. The wizard creates your `.env`, connects to Jira, and personalises `CLAUDE.md` for your project.

---

## How It Works

The squad follows a strict, human-approved lifecycle for every feature:

**1. Plan** — Tell the Product Owner to read your requirements document. It proposes an Epic and Story breakdown, waits for your approval, then creates the Jira tickets.

**2. Build** — The Developer picks up a story, creates a feature branch, implements the code in small commits, and opens a Pull Request. It stops there and waits.

**3. Review** — The QA Engineer reads the PR diff, checks every acceptance criterion, writes automated tests, and — for any user-facing change — asks you to run a manual test script in your browser. It posts a full review report as a PR comment.

**4. Ship** — You see a one-line summary: verdict, test count, manual test results. You say yes. The Delivery Lead merges the PR, closes the Jira ticket, and asks if you want to start the next story.

Then it repeats, one story at a time.

---

## What You Control

The squad is designed to move fast without moving unsafely. Every consequential action requires your explicit approval:

| Action | Who proposes it | Who approves it |
|---|---|---|
| Epic and Story breakdown | Product Owner | You |
| Creating Jira tickets | Product Owner | You |
| Creating a feature branch | Developer | You |
| Opening a Pull Request | Developer | You |
| Merging a PR | QA Engineer | You |
| Moving a Jira ticket | Any agent | You |

No agent merges, commits, or changes Jira state without a clear "yes" from you first.

---

## Activating the Agents

You can run the full automated workflow with the Delivery Lead, or activate any agent individually:

```
# Run the full workflow
"Pick up the next ticket."

# Plan your backlog
"You are the Product Owner. Read docs/requirements.md and propose an Epic and Story breakdown."

# Implement a story
"You are the Developer. Implement [PROJECT_KEY]-12: [story title]. [paste details]"

# Review a PR
"You are the QA Engineer. Review PR #42 for [PROJECT_KEY]-12. [paste acceptance criteria]"
```

---

## Full Documentation

See [docs/setup-guide.md](docs/setup-guide.md) for detailed setup instructions, GitHub–Jira integration, and troubleshooting.

---

## License

MIT
