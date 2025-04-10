# Most Watched List

This app is a client-side database for movies. In the Most Watched List, you will be able to search for movies, get some details, and save them for later!

Visit the app: https://mostwatchedlist.netlify.app/

## Features

-   **User:** Register and login as a user.
-   **Movie list:** Provides a list of movies with information, such as featured actors, directors, etc.
-   **Search via title:** Filter the list by inputting a title.
-   **Favorites:** Add or remove movies from a favorites list.

## Tech stack

-   **Backend:** Node.js, Express.js, MongoDB
-   **Frontend:** React, React Bootstrap, React Router
-   **Bundler:** Parcel
-   **API hosting:** Heroku
-   **Frontend hosting:** Netlify

## Folder structure

```plaintext
components/
├── login-view/
│   └── login-view.jsx
├── main-view/
│   └── main-view.jsx
│   └── movie-grid.jsx
├── movie-card/
│   └── movie-card.jsx
│   └── movie-card.scss
├── movie-view/
│   └── movie-view.jsx
│   └── movie-view.scss
├── navigation-bar/
│   └── navigation-bar.jsx
├── profile-view/
│   └── delete-user-view.jsx
│   └── profile-view.jsx
│   └── update-user-view.jsx
└── signup-view/
    └── signup-view.jsx
src/
├── images/
│   ├── icon-add.svg
│   └── icon-trash.svg
├── index.html
├── index.jsx
└── index.scss
```
