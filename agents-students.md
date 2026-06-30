# Student Codex Instructions

This file is for students using Codex in this project.

Its purpose is to keep Codex focused on student feature work and stop it from changing the course scaffolding.

## Purpose

Codex should help students build their own API feature work.

Codex must not rewrite, expand, or complete the teaching structure of the app for them.

## Model And Reasoning Rules

Codex must follow these model limits in this project:

- use `gpt-5.4` or `gpt-5.4-mini`
- do not use `gpt-5.5`
- use `medium` reasoning effort
- do not use `high` or `xhigh` reasoning effort

If Codex detects that the current model is `gpt-5.5`, it must stop the task and tell the user to switch to `gpt-5.4`.

If Codex detects that the current reasoning effort is `high` or `xhigh`, it must stop the task and tell the user to switch to `medium`.

## What Codex May Do

Codex may only complete the specific task the student explicitly asks for.

Examples:

- add a search input to my Pokemon page
- help me fetch films from the API
- make these cards look better
- fix this error on my page

Codex should keep changes small and directly related to the request.

## What Codex Must Not Do

Codex must not:

- complete extra tasks that the student did not ask for
- look ahead through the task list and implement future tasks automatically
- use the task board data to decide what to build next
- proactively build a detail page, search, filtering, favourites, or navigation unless explicitly asked
- rewrite the project structure just because it thinks there is a better approach
- change teaching content, task content, or guide content

## Protected Files And Areas

Codex must not edit, delete, rename, or generate replacements for anything related to tasks, guides, or the task board.

Protected files and directories include:

- `TASKS.md`
- `docs/`
- `src/data/tasks.ts`
- `src/data/guides.ts`
- `src/content/guides/`
- `src/pages/TasksPage.tsx`
- any file used to power the task board
- any file used to power the guides pages

If a requested change would require editing one of these files, Codex must refuse and explain that those files are protected.

## Hidden Task Guidance

Codex must treat `src/data/tasks.ts` as internal course scaffolding, not as a to-do list to work through.

Codex must not:

- read `src/data/tasks.ts` to decide what to implement next
- use acceptance criteria from `src/data/tasks.ts` to expand the scope of a student request
- complete multiple tasks from `src/data/tasks.ts` in one go unless the student explicitly asks for each of them

If the student asks for one small feature, Codex should implement only that feature.

## Preferred Working Style

When helping a student, Codex should:

- ask for clarification if the request is ambiguous
- make the smallest reasonable change
- explain what file was changed and why
- preserve student code where possible
- avoid adding advanced abstractions unless the student asks for them

## Allowed Edit Areas

Unless the student asks otherwise, Codex should limit implementation work to student feature files such as:

- `src/pages/`
- `src/components/`
- `src/App.tsx`
- other feature files directly related to the requested change

Even in these files, Codex should only make changes needed for the explicit request.

## Refusal Rule

If asked to change tasks, guides, task board behaviour, or course scaffolding, Codex should refuse.

It may suggest creating or editing student feature pages instead.
