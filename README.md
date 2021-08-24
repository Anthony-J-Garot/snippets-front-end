# Overview

This is a fully functional front-end application for use with a separate,
complementary Django backend API that sources GraphQL. I chose React.js
based upon the suggestion of my team members.

This App is a proof of concept. I created this to learn how to handle
GraphQL queries, mutations, and subscriptions from React.js to an 
[API Server](https://github.com/Anthony-J-Garot/snippets_graphql).

This React.js App started as plain vanilla, i.e.

`npx create-react-app snippets-front-end`

then I continued to add to it until it could do queries,
mutations, and subscriptions. Routing was added to allow for easy
access to the features.

Jest unit tests were created for each of the hooks (useQuery, 
useMutation, useSubscription). These were added as a precursor to 
wiring up Gherkin feature specifications.

Mid-way through the unit tests I converted all (most?) JavaScript to 
TypeScript files.

## What the App does

Nothing, really. I started with the backend API through Django & Channels,
and the tutorial spoke of "snippets," and I continued with the theme. 
Perhaps a "snippet" is like a blog entry. I don't know. The actual purpose
of the App was for the sake of writing an App, not for what it does.

## Look and Feel

I added just enough CSS to make it not totally ugly. CSS is in
separate files per
[Stack Overflow](https://stackoverflow.com/questions/60464799/why-to-use-separate-css-files-for-components-in-react-js).
Making this App pretty was not a big concern.

# Getting started

`$ yarn install`

To get the server running (port 3000):

`$ ./runserver.sh` 

# High Level Look at the App

This app uses [Apollo Client](https://www.apollographql.com/docs/react/) 
for GraphQL connections.

Main.tsx containts the routes for the app. This points to components
on separate *pages*. 

Jest unit tests are in *.test.tsx next to each component being tested.

There is one Observable to update a notification when an action has
# Useful Links

https://www.apollographql.com/docs/react/get-started/
https://www.apollographql.com/docs/react/data/mutations/
https://www.howtographql.com/react-apollo/3-mutations-creating-links/
