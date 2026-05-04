# Setup Guide

This guide walks you through bootstrapping the AI Dev Squad in a new project.

## Prerequisites

| Prerequisite | Notes |
|---|---|
| [Claude Code](https://claude.ai/code) | The CLI that powers all agents |
| [Node.js](https://nodejs.org) v18 or later | Required for skills installation |
| [GitHub CLI](https://cli.github.com) (`gh`) | Required for PR creation, merging, and issue management |
| A GitHub repo with Issues enabled | The repo this squad will work in |

### Verify GitHub CLI is authenticated

```bash
gh auth status
```

If not authenticated, run `gh auth login` first.

---

## Step 1 — Copy the template into your project

```bash
# Clone this repo (or download as a ZIP)
git clone https://github.com/araujobernardo/ai-dev-squad.git
cd ai-dev-squad

# Copy the squad files into your project
cp -r .claude/ /path/to/your/project/
cp constitution.md /path/to/your/project/
cp -r docs/ /path/to/your/project/
cp CLAUDE.md /path/to/your/project/
```

Or, if starting a brand new project from scratch:

```bash
git clone https://github.com/araujobernardo/ai-dev-squad.git my-project
cd my-project
rm -rf .git
git init
git add .
git commit -m "chore: initialise project from ai-dev-squad template"
```

---

## Step 2 — Replace placeholders

Find and replace the following placeholders throughout all files:

| Placeholder | Replace with |
|---|---|
| `[PROJECT_NAME]` | Your project name, e.g. `Finance Analyser` |
| `[TICKET_PREFIX]` | Your issue prefix, e.g. `FA`, `MYAPP` |
| `[DATE]` | Today's date in `YYYY-MM-DD` format (in `constitution.md`) |

Quick replace on macOS/Linux:

```bash
find . -not -path './.git/*' -type f -name '*.md' \
  -exec sed -i '' 's/\[PROJECT_NAME\]/Finance Analyser/g' {} \;
```

---

## Step 3 — Install skills

The squad uses two Claude Code skills. Install them from your project root:

```bash
npx skills add speckit
npx skills add impeccable
```

`speckit` powers the `/speckit-specify` → `/speckit-plan` → `/speckit-tasks` feature lifecycle.  
`impeccable` powers the Designer agent's UX anti-pattern checks and QA design audit.

---

## Step 4 — Create project-specific docs

Create these files (the agents will reference them):

- **`docs/requirements.md`** — what you want to build (plain prose or bullet points)
- **`docs/architecture.md`** — your tech stack, file layout, key patterns
- **`docs/design-system.md`** — colour tokens, typography, spacing (or let the Designer create it)

---

## Step 5 — Create GitHub Issue labels

The squad uses these labels. Create them in your repo:

```bash
gh label create "type:story"    --color "#0075ca" --description "A deliverable story"
gh label create "type:bug"      --color "#d73a4a" --description "A bug raised during QA review"
gh label create "status:backlog"     --color "#e4e669" --description "Available to pick up"
gh label create "status:in-progress" --color "#f9a03f" --description "Claimed — in development"
gh label create "status:in-review"   --color "#0052cc" --description "PR open — waiting for QA"
gh label create "blocked"       --color "#b60205" --description "Has an unresolved blocker"
```

---

## Step 6 — Start the feature lifecycle

Open Claude Code in your project and run:

```
/speckit-specify
```

Describe the feature you want to build. Speckit will create a spec, plan, and tasks, then open GitHub Issues for the squad to pick up.

Then activate the Delivery Lead:

```
Pick up the next ticket.
```

The squad runs autonomously from here — Developer implements, QA reviews and merges, Delivery Lead coordinates.

---

## Activating individual agents

You can also invoke agents directly without the Delivery Lead:

### Developer
```
You are the Developer agent. Follow .claude/agents/developer.md exactly.
Implement issue #XX: [story title]. [Paste acceptance criteria and technical notes.]
```

### QA
```
You are the QA agent. Follow .claude/agents/qa.md exactly.
Review PR #[number] for issue #XX: [story title]. [Paste acceptance criteria.]
```

### Designer (UI stories only)
```
You are the Designer agent. Follow .claude/agents/designer.md exactly.
Design the UX for issue #XX: [story title]. [Paste UX Notes and acceptance criteria.]
```
