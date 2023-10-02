[![Build](https://github.com/planetmalone/github_snooper/actions/workflows/react.yml/badge.svg?branch=main)](https://github.com/planetmalone/github_snooper/actions/workflows/react.yml)
# Welcome to GitHub Snooper!
This repository showcases an application built with Remix. It uses the following technologies:
1. Remix (React)
2. GraphQL (GitHub API)
3. Vercel (Deployments)


## Instructions to Run Code
### Running the application
To start the app, run the following terminal command:
```
yarn start
```
or
```
npm run start
```

### Making API calls
In order for the app to make API calls, an environment variable containing a GitHub token is required. A personal access
token is recommended. To create a new token, visit https://github.com/settings/tokens?type=beta.

Once the token is created, it can be added to the current terminal session by running the following terminal command:
```
export REACT_APP_GITHUB_TOKEN={token}
```
To add the token only for one instance of the dev server, prefix the environment variable to the start command:
```
REACT_APP_GITHUB_TOKEN={token} yarn start
```
or
```
REACT_APP_GITHUB_TOKEN={token} npm run start
```
_Note: The above instructions apply only to unix-based terminals. If on Windows, please use a unix-based terminal such
as "Linux subsystem for Windows."_

## Technical Design Decisions
### Testing
Why did I put this first? Because it's the most important aspect of building applications. With this being a client-side
only application, I went with the tried-and-true Jest + React Testing Library for unit and component tests and Cypress
for E2E tests. Jest was chosen for component testing because I am more familiar with it than Cypress. I figured
an exercise for applying to a company is probably not the best time to learn something new.

### Framework
When it comes to server-rendered React applications, there are really only two frameworks that come to mind, Next.js and Remix.
Next.js has been around longer is currently more popular. It's a great framework to use because it has a robust feature
set, large community, and is supported by [Vercel](https://vercel.com).

For this project, I decided to go with Remix. It has a fairly large overlap with Next.js regarding features in addition
to following a pattern I personally find optimal. Remix prioritizes using native APIs and progressively adding third part
and fallback solutions as needed. Additionally, Remix has taken over stewardship of React Router. Moving from a standard
React SPA application is only a small move to Remix.

### Styles
I'm a big advocate of CSS looking like CSS; therefore, CSS-in-JS was immediately out as an option for me. It's not a bad
pattern, but it's not one I'd reach for if I had the choice. My go-to styling libraries are Styled Components and TailwindCSS.
I like the ability to use the template literal flavor of Styled Components in order to write CSS.
I like being able to make runtime decisions with styling while also having the styles at least mostly look like CSS. 😉

I am less familiar with Tailwind CSS, and I'm still coming around to it. I decided to use it for this project since it's
what Real uses. Utility classes are efficient and increase developer velocity. The only real issue I see with Tailwind is
how verbose the className prop can become. It's possible to combine classes using @apply, but I'm trying to embrace the
change. I like how easy it is to style for light/dark mode, break points, animations, and accessibility helpers.

### Routing
For routing, I used React Router v6. I have extensive experience using its style, having built several Remix applications.
I went with the configuration flavor instead of components as it's familiar and allows me to leverage some of the new
features like loaders.

### API Calls/ Caching
I am an advocate of abstracting data management out of components. I include the API clients in that designator because
generally they're wrapped in the same hooks as other state management mechanisms for caching purposes. Components should
not know where data is coming from. The loader pattern does go a bit against this, but the code is packaged in its own
function which can easily be moved to a separate file if desired.

For this project, I went with the hook/ fetch pattern where the "data" hook provides the entities as well as a fetch
function, similar to how Redux and useReducer use the state and dispatch functions. I considered leveraging a flux pattern
such as Redux of even the simpler useReducer hook. Both seemed like overkill for this small project. I tend to scale up
state management mechanisms as needed. I had a SearchContext at one point where I cached both the search term and already
searched results. I realized even that was more than needed.

Creating a simple hashmap inside the API Client was enough to solve caching calls to the server. In addition, the search
is stored as a query param to allow for persistence and sharing. I decided to only cache the search call as it's being
called many times in a short amount of time. The user details call contains a lot more data and is called less often.
The number of cache hits is greatly reduced, and the memory footprint it would create isn't worth it.

GitHub provides both a REST and GraphQL API. GraphQL allows consumers to describe what they want. The benefit is a reduced
footprint returned from the API. Unfortunately, GitHub's GraphQL API is not performant. I had originally planned to add
more user details than required, but it became exponentially slower adding even a single field more. As it stands, it takes
~0.5-1 seconds to fetch the user details. It's not great, but it's better than what it would take to make multiple calls
to fetch the relational data. With an optimized GraphQL implementation, the benefits are more obvious.