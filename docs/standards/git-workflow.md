# Git Workflow

## Branch Naming

Pattern: `type/[TICKET_PREFIX]-NNN-short-description-in-kebab-case`

Examples:

- `feat/[TICKET_PREFIX]-13-csv-upload-component`
- `feat/[TICKET_PREFIX]-14-parse-validate-csv`
- `fix/[TICKET_PREFIX]-16-duplicate-upload-detection`

The ticket prefix immediately after the type prefix links branches to GitHub Issues
(and optionally to Jira if you use the GitHub-Jira integration).

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat: add CSV file upload component`
- `fix: handle duplicate month detection`
- `chore: add Prettier config`
- `test: add unit tests for CSV parser`

## Branch Hygiene

- **Always branch from `main`** — never from another feature branch unless
  the user explicitly instructs a stack.
- Run `git fetch origin main` before creating a new branch.
- **Before every `git commit`**, run `git branch --show-current` and confirm
  the output matches your feature branch. If it shows `main`, stop immediately.
- **Never use stash to switch contexts** — if you find yourself on the wrong
  branch with uncommitted changes, stop and ask the user.

## Worktrees (required for parallel agents)

Every Developer agent must use a git worktree for its story. This is the only
way to guarantee that parallel agents never overwrite each other's files.

1. Use `EnterWorktree` — it creates an isolated working directory.
2. Do all file reads and writes inside that worktree.
3. When the PR is opened, call `ExitWorktree` to clean up.

If `EnterWorktree` is unavailable, create the worktree manually:

```
git worktree add ../[project]-[TICKET_PREFIX]-NNN -b feat/[TICKET_PREFIX]-NNN-short-description
```

Never skip the worktree step when other stories are In Progress.

## Pull Requests

- Open a PR after every story — never push directly to `main`.
- PR title must follow Conventional Commit style and include the issue number.
- PR description must explain what was built and how to test it manually.
- Never merge your own PR — QA handles all merges.
