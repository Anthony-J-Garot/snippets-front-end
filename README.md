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
occurred.

# Running the unit tests

## Standard Unit Tests

The standard unit tests can be run using yarn:

`$ yarn test`

## Gherkin specifications

The Gherkin tests use the 'gherkin' script I put into package.json.
I prefaced with [eslint](https://eslint.org/docs/user-guide/command-line-interface)
because, why wouldn't you? 

All:

`$ yarn gherkin`

Specific:

`$ yarn gherkin specs/step-definitions/CreateSnippet.steps.tsx`

# Useful Links

https://www.apollographql.com/docs/react/get-started/
https://www.apollographql.com/docs/react/data/mutations/
https://www.howtographql.com/react-apollo/3-mutations-creating-links/

# CORS

My backend is Django on port 4000, and my front-end is React
on port 3000. They're on the same VM, 192.168.2.99 specifically,
but I access from a web browser on my laptop. As such, CORS
became an issue.

I got around it initially with [this answer](https://stackoverflow.com/a/51388077) 
from Stack Overflow. On the Django side I followed 
[The Django CORS Guide](https://www.stackhawk.com/blog/django-cors-guide/).

I only noticed that it failed when I converted the Apollo Client 
connection to TypeScript, because ApolloClient() does not have the 
fetchOptions option.

By failure I mean:

* only delete fails
* 400 Bad Request
* Referrer Policy : strict-origin-when-cross-origin
* Access-Control-Allow-Origin: http://192.168.2.99:3000

Hmmm . . . now I wonder if this was a CORS issue after all. The Referrer 
Policy threw me because it's there and in red. Hmmm.

Ack! Never mind. I will leave this CORS section here because it has
some useful links, but when I looked in the Response body I saw that
it was simply a gql error. You know, the Django backend was awfully
bashful on the nature of this issue. Now, at least, I can feel 
some confidence to convert the ApolloClient() code to TypeScript.
