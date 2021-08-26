import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import AllSnippets, {ALL_SNIPPETS_QUERY} from './index';
import {StaticRouter} from 'react-router-dom';
import {newDataAllSnippets} from './mockFixtures';

/*
 * For standard (non Gherkin) unit tests, the jest framework works well enough.
 * https://jestjs.io/docs/expect
 *
 * To run just the tests in this file:
 * $ yarn test src/pages/AllSnippets/index.test.tsx
 */

/*
 * Each mock object defines a request field (indicating the shape and variables of the operation to
 * match against) and a result field (indicating the shape of the response to return for that operation).
 */
const mocks: readonly MockedResponse[] = [
  {
    request: {
      query: ALL_SNIPPETS_QUERY,
      variables: {},
    },
    newData: () => {
      // . . . arbitrary logic . . .
      console.log('newData 0 fired');

      return newDataAllSnippets();
    },
  },
];

it('renders without error', () => {
  const component = TestRenderer.create(
    <StaticRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <AllSnippets />
      </MockedProvider>,
    </StaticRouter>
  );

  // The "test instance"
  const instance = (component as { root: ReactTestInstance }).root;

  const loading = instance.findAllByProps({className: 'loading'});
  // console.log(loading[0].children) ;
  expect(loading[0].children).toContain('Loading...');
});

/*
 * Need <BrowseRouter> because of embedded <Link>s.
 */
it('should render rows', async () => {

  let component = {};
  await TestRenderer.act(async () => {
    component = await TestRenderer.create(
      <StaticRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <AllSnippets />
        </MockedProvider>,
      </StaticRouter>
    );

    await new Promise(resolve => setTimeout(resolve, 200 + (Math.random() * 300)));
  });


  // The "test instance"
  const instance = (component as { root: ReactTestInstance }).root;

  // You can convert to JSON first then drill down from there.
  // console.log(component.toJSON()[0].children[1].children[1].children[1]);

  // When using findByProps or findAllByProps, be sure to use the React name,
  // not the HTML name. So use className instead of class, even though in the
  // DOM it's class.
  const titles = instance.findAllByProps({className: 'col2'});
  const title_2 = titles[1].children;
  // console.log('title_2', title_2);

  // toContain can be used even though the array contains only one entry.
  // https://jestjs.io/docs/expect#tocontainitem
  expect(title_2).toContain('Chick Corea');
});
