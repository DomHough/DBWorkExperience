# Writing better prompts

Session 1 is intended to be manual. From Session 2 onwards, AI can help with more advanced tasks.

When students use AI, weak prompts usually produce vague answers. Strong prompts produce clearer help with less rewriting.

## Start with the goal

Say exactly what you want.

- build a list page
- debug a broken route
- add search to a React page
- explain why a fetch request is failing

## Add project context

The tool is more useful when it knows:

- this project uses React and TypeScript
- styling should use Tailwind classes only
- the file or component you are changing
- what already works
- what is currently failing

## Add constraints

Constraints reduce irrelevant answers.

- keep it beginner friendly
- do not add extra libraries
- use local storage for saved data
- explain the change before rewriting the file

## Ask for a specific output

Bad prompt:

```md
Help with my app.
```

Better prompt:

```md
Help me add search to my React list page.
Use TypeScript and Tailwind only.
Do not add any libraries.
Explain the state I need first, then show the updated component.
```

## Ask smaller questions when needed

If a task is large, split it.

- first ask how the state should work
- then ask for the UI controls
- then ask how to connect filtering or sorting

## Check the answer critically

Students should still read the answer and ask:

- does this match the task?
- does it use patterns already in the project?
- is it simple enough to understand?
- did it add unnecessary code?

## Good prompt checklist

- Is the goal clear?
- Is the file or component named?
- Are the project rules included?
- Did you say what kind of answer you want?
