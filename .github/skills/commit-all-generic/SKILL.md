---
name: commit-all-generic
description: Use this skill when the user wants to commit the current repository changes with a fixed generic message instead of a commit message based on the specific work. It stages all tracked and untracked changes and creates one git commit with a standard message.
---

# Commit All Generic

Use this skill when the user explicitly wants a simple catch-all commit for the current repository state.

## Workflow

1. Confirm you are in the intended git repository.
2. Run `scripts/commit_all_generic.sh`.
3. Report whether a commit was created or whether there was nothing to commit.

## Constraints

- Do not invent a commit message from the diff.
- Do not split the work into multiple commits.
- Do not push.
- Do not use destructive git commands.

## Notes

- The script stages all current changes with `git add -A`.
- The commit message is fixed as `chore: update files`.
