# Writing better prompts

Session 1 should be manual. From Session 2 onwards, AI can help with more advanced tasks.

This guide is not a code-file guide, but it should still show a before and after example tied to this repo.

## Before: vague prompt

```md
Help with my app.
```

## After: repo-specific prompt

```md
Help me add search to `src/pages/PokemonPage.tsx`.
This project uses React, TypeScript, and Tailwind only.
Do not add any libraries.
Please explain the state I need first, then show the updated code.
```

## Better prompt checklist

- Name the file, such as `src/pages/PokemonPage.tsx`
- Name the feature, such as search, filtering, or a detail route
- Mention the project rule to use Tailwind classes only
- Ask for the kind of answer you want, such as explanation first or full code
