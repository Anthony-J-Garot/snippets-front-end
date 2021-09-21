import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';
import App from './App';
import client from './ApolloClient';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {promiseTimeout} from './utils';

// $ ./run_regulartests.sh src/App.test.tsx
// Need some goop around <App /> because of routes
test('renders App', async () => {
  const testRenderer = TestRenderer.create(
    <StaticRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StaticRouter>
  );

  const testInstance = (testRenderer as { root: ReactTestInstance }).root;
  // console.log('testInstance', testInstance);

  // Don't really have to trigger anything. Just give time for the mocked data to come in.
  await TestRenderer.act(async () => {
    await new Promise(resolve => promiseTimeout(resolve));
  });

  // Make sure the testRenderer rendered
  const app = testInstance.findByType(App);
  expect(app).toBeDefined();

  const h2 = testInstance.findByType('h2');
  expect(h2.props.children).toBe('Snippets Front-end App');
});
