# Overview

This is a front-end application separate from the Django backend 
API that sources GraphQL. The front-end guys on my team tend
towards React.js, so I cobbled this App to be a proof of concept
that an isolated front-end can do queries and mutations to the
[snippets_graphql](https://github.com/Anthony-J-Garot/snippets_graphql) 
backend that I wrote.

This React.js App started as plain vanilla, i.e.

`npx create-react-app snippets-front-end`

then I continued to add to it until it could do queries
and mutations. I also added routing to allow for easy
access to the features.

# Getting started

After npm install, I loaded these packages.

`npm install @apollo/client graphql`
`npm install react-router-dom`

Looks like these lines made it into package.json, so these
should be loaded for you automatically. I mention it specifically
because these are dependencies necessary to do GraphQL and
routes.

`./runserver.sh` will get the server running on port 3000. You
can change the port inside this file if you wish.

# Useful Links

https://www.apollographql.com/docs/react/get-started/
https://www.apollographql.com/docs/react/data/mutations/
https://www.howtographql.com/react-apollo/3-mutations-creating-links/

# High Level Look at the App

## Started With a Query

I began by writing a query to pull all rows from the sqlite3
db used by the backend. A query is the simplest form of GraphQL. 
See AllSnippets/index.js for specifics.

I put the Apollo client connection into a file called 
constants.js so that I could have one connection for multiple 
*pages*. To have multiple pages, I needed to add routes. See the 
Routes section below.

## Create Mutation

This was the second proof of concept, which was a little more
complex because of the creation of a form. I cobbled this 
together from various examples on the Internet to my specific
"snippets" design.

## Routes

After the query spit out data, I moved on to a mutation. However,
I wanted to keep the All Snippets query. So I created multiple 
routes for different purposes that call the Django backend.

## Just a bit of formatting

I added just enough CSS to make it not totally ugly. CSS is in
separate files per [Stack Overflow](https://stackoverflow.com/questions/60464799/why-to-use-separate-css-files-for-components-in-react-js).
