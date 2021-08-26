import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';
import './index.css';
import App from './App';
import client from './ApolloClient';

// Wrap React App with an ApolloProvider.
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
