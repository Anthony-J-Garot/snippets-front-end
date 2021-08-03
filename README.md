# Overview

I wanted a front-end application that was separate from the Django
backend API that sources GraphQL. The front-end guys on the team
use React.js, so I figured I would cobble something together to
pull some data and do a Mutation.

So this project is the front-end to the snippets_graphql backend.

# Setup

To create the React project:

`npx create-react-app snippets-front-end`

To start the webserver on port 3000

`npm start`

# Apollo Client

## Loading the client

https://www.apollographql.com/docs/react/get-started/

Load these two packages:

`npm install @apollo/client graphql`

FireFox said to load all the things, and I did, but I don't think I've used it yet

https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/

## Using the client

I ended up putting this into a file called constants.js so that I could have one connection for multiple *pages*. To have multiple pages, I needed to add routes. See the Routes section below.

# Routes

I got the my initial query to work and spit out data, but my real 
goal was to get a form wired up to the backend via GraphQL. So I
wanted to have multiple routes for different purposes that will call
the Django backend.

https://www.howtographql.com/react-apollo/3-mutations-creating-links/

`npm install react-router-dom`
