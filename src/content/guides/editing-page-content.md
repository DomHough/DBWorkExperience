# Editing page content

Changing text is a small task, but it is useful practice. It helps students get comfortable finding JSX and understanding which component controls which part of the screen.

## 1. Find the text in the right component

Open the page file that renders the text you want to change. For example, a heading might look like this:

```tsx
<h1 className="text-3xl font-semibold text-slate-900">Choose API Track</h1>
```

## 2. Replace the starter copy

Edit the text between the tags.

```tsx
<h1 className="text-3xl font-semibold text-slate-900">Build your first Pokemon page</h1>
```

Do the same for short paragraphs if you want the page to explain the project more clearly.

## 3. Keep the content short and readable

Starter layouts are intentionally simple. If you add much longer text, check that it still looks good on smaller screens.

## 4. Refresh and review

After editing the content, reload the page and make sure the new wording fits the design and still makes sense in context.

## Common mistakes

- Editing the wrong component and wondering why nothing changed.
- Adding too much text and breaking the layout.
- Forgetting that JSX text must stay inside one parent element.
