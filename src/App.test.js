import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';
import client from './ApolloClient';

// Need some goop around <App /> because of routes
test('renders App', () => {
  render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  );

  // Basically old school screen scraping
  const linkElement = screen.getByText(/Snippets Front-end App/i);
  expect(linkElement).toBeInTheDocument();
});
