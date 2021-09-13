import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import MySnippets, {LIMITED_SNIPPETS_QUERY} from './index';
import {StaticRouter} from 'react-router-dom';
import {newDataMySnippetsAuthenticatedUser} from './mockFixtures';
import {promiseTimeout} from '../../utils';
import { TGqlData } from '../../types';

/*
 * For standard (non Gherkin) unit tests, the jest framework works well enough.
 * https://jestjs.io/docs/expect
 *
 * To run just the tests in this file:
 * $ ./run_regulartests.sh src/pages/MySnippets/index.test.tsx
 */

const mocks: readonly MockedResponse[] = [
  {
    request: {
      query: LIMITED_SNIPPETS_QUERY,
      variables: {},
    },
    newData: () : TGqlData => {
      // . . . arbitrary logic . . .
      console.log('mock newData 0 fired');

      return newDataMySnippetsAuthenticatedUser;
    },
  },
];

it('renders without error', () => {
  const testRenderer = TestRenderer.create(
    <StaticRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MySnippets />
      </MockedProvider>,
    </StaticRouter>
  );


  const testInstance = (testRenderer as { root: ReactTestInstance }).root;

  const loading = testInstance.findAllByProps({className: 'loading'});
  // console.log(loading[0].children) ;
  expect(loading[0].children).toContain('Loading...');
});

/*
 * Need <BrowseRouter> because of embedded <Link>s.
 */
it('should render rows', async () => {

  let testRenderer = {};
  await TestRenderer.act(async () => {
    testRenderer = await TestRenderer.create(
      <StaticRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MySnippets />
        </MockedProvider>,
      </StaticRouter>
    );

    await new Promise(resolve => promiseTimeout(resolve));
  });


  const testInstance = (testRenderer as { root: ReactTestInstance }).root;

  // You can convert to JSON first then drill down from there.
  // console.log(testRenderer.toJSON()[0].children[1].children[1].children[1]);

  // When using findByProps or findAllByProps, be sure to use the React name,
  // not the HTML name. So use className instead of class, even though in the
  // DOM it's class.
  const titles = testInstance.findAllByProps({className: 'col2'});
  const title_2 = titles[1].children;
  // console.log('title_2', title_2);

  // toContain() can be used even though the array contains only one entry.
  // https://jestjs.io/docs/expect#tocontainitem
  expect(title_2).toContain('Chick Corea Elektric Band');
});
