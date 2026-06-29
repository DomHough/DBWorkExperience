# Project Intent

This repository is a work experience starter application built around a set of data APIs.

It is not meant to be a finished product. It should be a safe, approachable template that students can use as the starting point for their own website during the programme.

## Guidance

Students will have a wide range of experience, from beginners to more confident developers. The project should therefore remain:

- simple to understand
- easy to run locally
- small enough to explore without feeling overwhelmed
- flexible enough for students to extend in different directions

## Scope

The skeleton should stay intentionally bare, with only enough structure, setup, and example code for students to build on top of it.

## Available APIs

The app should offer students a small set of APIs to choose from on the tasks page.

Available options should include:

- Pokemon API
- Films API

Each API should support the same overall learning journey, even if the exact data fields are different.

## Student Journey

Students are expected to use the app across three coding sessions, each 30 minutes long.

### Session 1

The first session is for manual coding only. Students should not use AI tools during this session.

They begin on the tasks page, where they choose the API they want to work with. After selecting an API, they should see a set of starter tasks. The first tasks should be very simple and achievable without AI support, as many students will have very limited technical experience.

### Session 2

The second session introduces AI tools. At this point, students can use AI to help them complete the next set of tasks.

These tasks can be more advanced than the first session, but they should still build naturally on the earlier manual work rather than feeling like a separate project.

### Session 3

The third session should continue the same flow, giving students time to finish and improve their work with AI support available.

By the end of the programme, the student should have a small but complete API-driven feature they understand and can talk about.

## Task Design

Tasks should guide students toward the expected end result in small steps.

### Session 1 Tasks

The first session should focus on basic progress without AI. Example tasks include:

- choose an API from the tasks page
- create or update the page for that API
- fetch data from the chosen API
- display a simple list of items on the page
- show a small amount of useful information for each item

These tasks should be achievable by beginners and should help them get something visible working quickly.

### Session 2 Tasks

The second session should move students toward a more complete feature. Example tasks include:

- improve the list page layout
- make each list item clickable
- create a detail page for a selected item
- show more information on the detail page
- use AI support to solve larger or more technical steps

### Session 3 Tasks

The third session should help students complete and refine the feature. Example tasks include:

- add search
- add filtering
- improve the detail page content
- improve navigation between the list page and detail page
- tidy up the overall user experience

Tasks should clearly relate to the final product, so students can see how each step contributes to the finished feature.

## Expected Outcome

For each API, the expected end product is:

- a list page for that API
- a detail page for an individual item
- basic search and filtering

For example, if a student chooses the Pokemon API, they should end up with:

- a page showing a list of Pokemon
- a detail page for a selected Pokemon, reached by clicking from the list page
- optional choices about what information to show on those pages

If a student chooses the Films API, they should end up with:

- a page showing a list of films
- a detail page for a selected film, reached by clicking from the list page
- search and filtering for the film list
- flexibility to decide which film details matter most

The project should leave room for students to decide what details to display, while still guiding them toward building a clear list-and-detail experience.

## Styling

- Use Tailwind utility classes for all application styling.
- Do not add feature styling in `.css` files; keep CSS files for Tailwind entry/import only.
