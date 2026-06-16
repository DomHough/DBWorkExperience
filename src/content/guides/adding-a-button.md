# Adding a button

Buttons are a good beginner task because they combine JSX structure, readable text, and Tailwind styling in one small change.

## 1. Choose where the button should live

Buttons usually sit inside a page section, hero area, or card. Start by finding the component where the button belongs.

## 2. Add the button element

Create a basic button with a clear label.

```tsx
<button
  type="button"
  className="inline-flex rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
>
  View favourites
</button>
```

## 3. Make the label specific

Avoid vague labels like `Click here`. The button text should describe the action:

- `Open profile`
- `Load films`
- `View team`

## 4. Add interactive styling

At minimum, include hover styling so the button feels interactive. If you want to go one step further, add focus styles as well.

```tsx
className="inline-flex rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
```

## Common mistakes

- Adding a button with no clear purpose.
- Forgetting hover or focus styles.
- Using an `<a>` tag when the element is meant to act like a button on the page.
