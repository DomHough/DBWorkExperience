# Tasks Overview

This project is designed around a small set of guided tasks that help students build an API-driven feature over multiple coding sessions.

Students choose one API track in the app:

- PokeAPI
- Star Wars API
- IMDb API

Each track follows the same task structure. The data changes, but the learning journey stays the same.

## Session 1

Session 1 is intended to be completed without AI tools. These tasks are small, beginner-friendly changes that help students get comfortable with the codebase.

### Change the background colour

Make a visible styling change using Tailwind classes.

### Create the list page and route

Add the list page component and connect it to the router so the project has a dedicated screen for the chosen API, even before any real API data is shown.

### Add a navbar link

Add a navigation link so users can open the new page from the main navbar.

### Update some page text

Replace starter text with clearer or more personal copy.

### Change the browser tab title

Update the title shown in the browser tab so it better matches the student project or chosen API.

### Add a simple button

Add a button to practise JSX structure and Tailwind button styling.

## Session 2+

From Session 2 onwards, AI support can be used. These tasks move students towards the main finished feature.

### Fetch a list of items

Call the API, store the returned data in component state, and render the results on the page so users can browse them.
Each list item should show useful information, include a picture where available, and support moving through the results clearly if there are lots of items.

### Add a detail page

Make list items clickable and open a separate page for one selected item.

### Show detail data

Display more information about the selected item on the detail page.

### Add search

Let users search the list to find a specific item more quickly.

### Add filtering

Add at least one filter so users can narrow down the list.

### Show how many results are on the page

Show a small result count above the list so users can see how many items are currently being displayed.

### Add a back button to the detail page

Add a clear way for users to go back to the list page after opening one item.

### Add a reset button for search and filters

Let users clear their search and filter choices in one click and return to the full list.

### Show a message when an item cannot be found

If a user opens a detail page for an item that does not exist, show a helpful message instead of a broken page.

### Add a list view and a grid view

Let users switch between two different layouts for viewing the same data.

### Add favourites

Let users save favourite items and view them again later. This can be a favourites page, a favourites section, or saved state shown on the main feature.

### Create your own item

Let users create their own version of an item inspired by the chosen API. For example, this could be a custom Pokemon, a custom film, or a custom Star Wars character or ship.

### Create a collection

Let users build a group of items. For example, this could be a Pokemon team, a film watchlist, or a Star Wars squad or crew.

### Add sorting

Let users sort the list in a useful way, such as alphabetically, by year, by rating, or by another field that suits the chosen API.

### Add personal notes

Let users add their own notes or comments to an item and show those notes on the page.

## Expected Outcome

By the end of the programme, each student should have:

- a list page for their chosen API
- a detail page for an individual item
- basic search
- basic filtering

Examples:

- PokeAPI: a list of Pokemon and a detail page for a selected Pokemon
- Star Wars API: a list of Star Wars items and a detail page for a selected item
- IMDb API: a list of films and a detail page for a selected film

Students may also extend this with:

- result counts
- back navigation from detail pages
- reset controls for search and filters
- helpful not found messages
- list and grid view options
- favourites
- custom created items
- collections such as teams, squads, or watchlists
- sorting
- personal notes

## Notes For Contributors

- Keep tasks simple and approachable for beginners.
- Use Tailwind utility classes for styling.
- Avoid adding complexity unless it clearly supports the student journey.
- The app should guide students, but still leave room for their own design and content decisions.
