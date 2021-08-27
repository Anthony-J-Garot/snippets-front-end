import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import SubscribeSnippet, {SNIPPET_NOGROUP_SUBSCRIPTION} from './index';
import {StaticRouter} from 'react-router-dom';
import {newDataFeedItem} from './mockFixtures';

/*
 * For standard (non Gherkin) unit tests, the jest framework works well enough.
 * https://jestjs.io/docs/expect
 *
 * To run just the tests in this file:
 * $ yarn test src/pages/SubscribeSnippet/
 */


let subscriptionMutationCalled = 0;
const mocks: readonly MockedResponse[] = [
  {
    request: {
      query: SNIPPET_NOGROUP_SUBSCRIPTION,
      variables: {}, // no inputs necessary for this particular (no-group) subscription
    },
    // newData totally overrides result
    newData: () => {
      // . . . arbitrary logic . . .
      console.log('mock newData 0: fired');

      subscriptionMutationCalled++;
      return newDataFeedItem();
    },
  },
];

/*
 * Need <BrowseRouter> because of embedded <Link>s.
 */
it('should receive a snippet feed item', async () => {
  const testRenderer = TestRenderer.create(
    <StaticRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <SubscribeSnippet />
      </MockedProvider>,
    </StaticRouter>
  );

  
  const testInstance = (testRenderer as { root: ReactTestInstance }).root;
  // console.log('root', instance);

  // Ensure the page rendered
  const pageTitle = testInstance.findByProps({className: 'App-page-title'});
  expect(pageTitle).toBeDefined();
  expect(pageTitle.props.children).toBe('Real-time Subscription Feed');

  // Don't really have to trigger anything. Just give time for the mocked data to come in.
  await TestRenderer.act(async () => {
    await new Promise(resolve => setTimeout(resolve, 200 + (Math.random() * 300)));
  });

  // How did we do?
  expect(subscriptionMutationCalled).toBe(1);
});
