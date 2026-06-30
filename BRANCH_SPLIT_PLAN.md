# Branch Split Plan

This file lists the repository changes needed to keep a developer-focused branch and a user-facing branch.

## Branch intent

- `dev`: keep developer tooling, internal notes, scaffolding guidance, and course-maintainer files.
- `main`: keep only the files a user or student needs to run and work on the starter app.

## Files to change for `main`

- `AGENTS.md`: change. Replace the developer/maintainer instructions with the student-facing Codex instructions.
- `agents-students.md`: delete after its contents have been moved into `AGENTS.md`.
- `scripts/generate_session1_cheatsheet_pdf.py`: delete. This is a developer-only document generation script.
- `docs/session-1-starter-cheatsheet.md`: delete. This is internal course/support material, not needed in the user-facing branch.
- `docs/`: delete if empty after removing the cheatsheet file.
- `TASKS.md`: delete. This is internal planning/task content, not needed in the user-facing branch.

## Branch setup actions

- `master`: change branch strategy. Rename or replace this with a `dev` branch if you want `dev` to be the long-lived developer branch.
- `dev`: create. This branch should keep the full developer version of the repository.
- `main`: create. This branch should contain the cleaned user-facing version of the repository.
