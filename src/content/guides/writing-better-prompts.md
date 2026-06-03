# Writing better prompts

If you use AI tools while building your project, weak prompts usually lead to vague answers. Strong prompts create a clearer task with clearer boundaries.

## Include the goal

Start with what you want the tool to do.

- Build a React component.
- Explain an error message.
- Refactor a function.
- Suggest accessibility improvements.

## Add context

The tool is more useful when it knows what you are working with.

- Which framework you are using.
- Which file or component is involved.
- What you already tried.
- What is currently going wrong.

## Add constraints

Good constraints reduce irrelevant answers.

- Use TypeScript.
- Keep the code beginner friendly.
- Do not add extra dependencies.
- Use Tailwind classes only.

## Ask for a specific output

Instead of asking for help in general, ask for the exact form you need.

```md
Help me debug why this React component keeps fetching in a loop.
Explain the cause first, then show a fixed version.
Do not add any libraries.
```

## Give examples when useful

If you want a certain tone, structure, or style, show one short example.

## Improve the conversation

If the first answer is close but not good enough, refine it.

- Ask it to simplify the explanation.
- Ask it to keep your existing structure.
- Ask it to explain the tradeoffs.
- Ask it to change only one file.

## Prompt checklist

- Is the goal clear?
- Is the context concrete?
- Are the constraints stated?
- Did you ask for the output format you want?

Better prompts are usually shorter than people expect, but they are more specific.
