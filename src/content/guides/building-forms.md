# Building forms

Forms are useful for later tasks such as custom notes, favourites, or creating your own item.

## A good place to add this in the repo

- File: `src/pages/PokemonPage.tsx`
- A sensible place: below the existing controls area, around lines `170` to `245`

## 1. Before: uncontrolled inputs

```tsx
<input placeholder="Name" />
<textarea placeholder="Description" />
```

## 2. After: controlled inputs with state

```tsx
const [name, setName] = useState('')
const [description, setDescription] = useState('')
```

```tsx
<input
  value={name}
  onChange={(event) => setName(event.target.value)}
  className="rounded-2xl border border-slate-300 px-4 py-3"
  placeholder="Name"
/>
```

```tsx
<textarea
  value={description}
  onChange={(event) => setDescription(event.target.value)}
  className="min-h-28 rounded-2xl border border-slate-300 px-4 py-3"
  placeholder="Description"
/>
```

## 3. Handle submit

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()

  if (!name.trim()) {
    return
  }

  const newItem = {
    id: crypto.randomUUID(),
    name: name.trim(),
    description: description.trim(),
  }

  setCustomItems((current) => [...current, newItem])
  setName('')
  setDescription('')
}
```

## Common mistakes

- Forgetting `event.preventDefault()`.
- Letting required fields submit empty values.
- Building a large form before the list page basics work.
