# Barstool Boxscores

This is a code code challenge repo for [this code challenge](https://github.com/BarstoolSports/fullstack-challenge). It uses Next.js to stand up a simple API and frontend that interacts with a couple external JSON files that are included in the base challenge repo.

## Architecture / Tools Used

### Typescript

The shape of the external JSON files are modeled with Typescript interfaces for easy static code analysis. Interfaces are stored in a `/models` folder while types are defined closer to the reason they exist.

### Providers

React's Context API is used to create a `BoxscoreProvider` that acts as a data component for the UI scoreboards. It watches the `query` parameter that Next's `useRouter` provides and loads the correct data based on the incoming query.

### Dynamic Routes

Next's dynamic routing is used for both the API routes and front end routes. This allows for easily passing in variables to ensure that the correct data is fetched for the particular dataset.

### SCSS Modules

CSS Modules allow for easy, modular SCSS imports with access via `styles` objects in my components.

### MongoDB

MongoDB is used to cache the data from the external API.
