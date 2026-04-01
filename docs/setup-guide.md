# Setup Guide

This guide walks you through configuring the AI Dev Squad for your project.

## Prerequisites

Before you begin, make sure you have the following installed and ready:

| Prerequisite | Notes |
|---|---|
| [Claude Code](https://claude.ai/code) | The CLI that powers all agents |
| [Node.js](https://nodejs.org) v18 or later | Required to run the setup scripts |
| [GitHub CLI](https://cli.github.com) (`gh`) | Required for PR creation and merging |
| A GitHub account and repo | The repo this squad will work in |
| A Jira account | Free tier at [atlassian.com](https://www.atlassian.com/software/jira) is sufficient |

### GitHub CLI — verify it works

```bash
gh auth status
```

If not authenticated, run `gh auth login` first.

### Jira API token

1. Log in to Jira and go to **Account Settings → Security → API tokens**
2. Click **Create API token**, give it a name, and copy the value
3. You will need this during setup — keep it ready

---

## Step 1 — Clone the template

```bash
git clone https://github.com/[YOUR_GITHUB_USERNAME]/ai-dev-squad my-project
cd my-project
```

Remove the template's git history and start fresh:

```bash
rm -rf .git
git init
git add .
git commit -m "chore: initialise project from ai-dev-squad template"
```

---

## Step 2 — Run the setup wizard

```bash
node scripts/setup.mjs
```

The wizard will ask for:
- **Project name** — used to personalise `CLAUDE.md`
- **Jira base URL** — e.g. `https://mycompany.atlassian.net`
- **Jira email** — the email address on your Jira account
- **Jira API token** — the token you created above
- **Jira project key** — e.g. `FA`, `MYAPP`
- **GitHub repo URL** — e.g. `https://github.com/you/my-project`

On success it will print:
```
Connection successful - logged in as: Your Name
=== Setup complete! ===
```

This creates a `.env` file at the project root. It is already listed in
`.gitignore` — never commit it.

---

## Step 3 — Add your requirements

Create `docs/requirements.md` and write out what you want to build.
There is no fixed format — plain prose, bullet points, or user stories
all work. The Product Owner agent will read this and structure it into
Epics and Stories.

---

## Step 4 — Connect your GitHub repo to Jira (optional)

For automatic branch-to-ticket linking:

1. In Jira, go to **Apps → GitHub for Jira** and install it
2. Connect your GitHub organisation or repo
3. Branches named `feat/[PROJECT_KEY]-123-description` will automatically
   appear on the Jira ticket

---

## Activating the Agents

Open Claude Code in your project directory and use these prompts:

### Product Owner
Breaks requirements into Epics and Stories and creates Jira tickets.

```
You are the Product Owner. Read docs/requirements.md and propose
an Epic and Story breakdown.
```

### Developer
Implements a single assigned Story on a feature branch.

```
You are the Developer. Implement [PROJECT_KEY]-XX: [story title].
Here are the details: [paste story description and acceptance criteria]
```

### QA
Reviews a PR and writes tests against the Story's acceptance criteria.

```
You are the QA Engineer. Review PR #[number] for [PROJECT_KEY]-XX: [story title].
Acceptance criteria: [paste criteria]
```

### Delivery Lead
Coordinates the full workflow end to end — just say:

```
Pick up the next ticket.
```

The Delivery Lead will find the next unblocked story in Jira, hand it
to the Developer, hand the PR to QA, present you with a summary, and
merge on your approval.

---

## Troubleshooting

### Jira 401 Unauthorized
Your API token or email is wrong. Re-run the connection test:
```bash
node scripts/test-jira-connection.mjs
```
If it fails, update the credentials in `.env` and try again.

### Jira 403 Forbidden
Your token is valid but lacks permission. Make sure the Jira account
has at least **Project Member** access to the project.

### `gh: command not found`
GitHub CLI is not on your PATH. Install it from [cli.github.com](https://cli.github.com)
and run `gh auth login` before continuing.

### Jira API endpoint returning 404
You may be using the wrong base URL. It should be:
`https://yoursite.atlassian.net` — no trailing slash, no `/jira` suffix.

### `replaceAll` error during setup
Make sure you are running Node.js v18 or later:
```bash
node --version
```
