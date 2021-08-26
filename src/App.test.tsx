import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';
import {screen} from '@testing-library/react';
import App from './App';
import client from './ApolloClient';
import ReactDOM from 'react-dom';

// $ yarn test src/App.test.tsx
// Need some goop around <App /> because of routes
test('renders App', () => {
  ReactDOM.render(
    <StaticRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StaticRouter>,
    document.getElementById('root')
  );

  // Basically old school screen scraping
  const linkElement = screen.getByText(/Snippets Front-end App/i);
  expect(linkElement).toBeInTheDocument();
});
