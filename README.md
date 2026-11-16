# Savour Lagos Kitchen

A responsive 4-page website for a fictional Nigerian restaurant, built with HTML, CSS and JavaScript as a web development course project.

> Business details (name, address, phone, email) are **sample details** created for this assignment.

## Live site
`ADD YOUR NETLIFY OR RENDER URL HERE`

## Pages
- `index.html` – Home: hero, welcome, highlights, favourite dishes, opening hours
- `about.html` – About: what we do, history, mission, vision, values, timeline
- `services.html` – Menu: six dishes in a grid with a category filter
- `contact.html` – Contact: details and a validated contact form

## Technologies
- **HTML5** – semantic elements (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`), lists, forms, images, ARIA attributes
- **CSS3** – external stylesheet, variables, box model, positioning (sticky header), **Flexbox** (nav, intro, features, hours, footer), **Grid** (menu cards, contact layout), **media queries** at 900px and 680px
- **JavaScript** – mobile menu toggle, menu category filter, contact form validation with live feedback

## Folder structure
```
├── index.html
├── about.html
├── services.html
├── contact.html
├── css/style.css
├── js/script.js
└── images/
```

## Run locally
Open `index.html` in a browser. No build step is needed.

## Deploy
Netlify: drag the project folder onto https://app.netlify.com/drop, or connect the GitHub repository.
Render: create a Static Site from the repository, leave the build command empty and set the publish directory to `.`

## Notes
The contact form only validates input in the browser. It is not connected to a backend, so it does not send messages.
