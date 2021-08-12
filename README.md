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

After ~~npm install~~ yarn install, I loaded these packages.

`yarn add @apollo/client graphql --dev`
`yarn add react-router-dom --dev`

I'm pretty well convinced that yarn is better than npm, hands
down. 

`./runserver.sh` will get the server running on port 3000. You
can change the port inside this file if you wish.

# High Level Look at the App

## Began With a Query

I began by writing a query to pull all rows from the sqlite3
db used by the backend. A query is the simplest form of GraphQL. 
See AllSnippets/index.js for specifics.

I put the Apollo client connection into a file called 
ApolloClient.js so that I could have one connection for multiple 
*pages*. To have multiple pages, I needed to add routes. See the 
Routes section below.

## The Create Mutation was next

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
separate files per
[Stack Overflow](https://stackoverflow.com/questions/60464799/why-to-use-separate-css-files-for-components-in-react-js).
Making this App pretty was not a big concern.

## The Update Mutation was next

There wasn't anything overly tricky about the update part of 
useMutation. What was a little tricky was pre-populating the form
with data first. The problem is that of the deconstruction forms
of useQuery and useMutation clobbering each other. So with regards
to data, error, and loading, we must consult MacLeod who would say,
"There can be only one (each)."

It turns out that data is only necessary from useQuery, and there
are methods attached to the useMutation hook that can be used instead
of the deconstructed loading and error. Well, there is for error . . .
I think I just don't care about loading with regards to useMutation.

So I got that sorted.

## The Subscription

This was a little tricky in React, but I got it to work. 

So, now I have a React version within this repo and a 
JavaScript native version in
[the backend repo](https://github.com/Anthony-J-Garot/snippets_graphql).

# Useful Links

https://www.apollographql.com/docs/react/get-started/
https://www.apollographql.com/docs/react/data/mutations/
https://www.howtographql.com/react-apollo/3-mutations-creating-links/
