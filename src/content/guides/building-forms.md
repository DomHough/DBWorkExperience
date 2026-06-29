# Building forms

Forms are useful for tasks such as:

- create your own item
- add personal notes
- name a team or watchlist

## 1. Start with state for each field

```tsx
const [name, setName] = useState('')
const [description, setDescription] = useState('')
```

## 2. Connect the inputs

```tsx
<input
  value={name}
  onChange={(event) => setName(event.target.value)}
  className="rounded-xl border border-slate-200 px-3 py-2"
  placeholder="Name"
/>
```

```tsx
<textarea
  value={description}
  onChange={(event) => setDescription(event.target.value)}
  className="min-h-28 rounded-xl border border-slate-200 px-3 py-2"
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

## 4. Add labels and simple validation

A beginner-friendly form should still be clear.

- label each field
- show which fields are required
- prevent empty submissions

## 5. Show the result after submit

For this project, students should usually show the created item on the page straight away.

## Common mistakes

- Forgetting `event.preventDefault()`.
- Letting required fields submit empty values.
- Building a large form before the basic version works.
- Not showing the saved or created result anywhere.
