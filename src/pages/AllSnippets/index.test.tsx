import React from 'react';
import TestRenderer from 'react-test-renderer';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import AllSnippets, {ALL_SNIPPETS_QUERY} from './index';
import {BrowserRouter} from 'react-router-dom';

/*
 * For standard (non Gherkin) unit tests, the jest framework works well enough.
 * https://jestjs.io/docs/expect
 *
 * To run just the tests in this file:
 * $ yarn test src/pages/AllSnippets/
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
    result: () => {
      // . . . arbitrary logic . . .
      // console.log('Result fired');

      /*
       * Note that I needed to switch the "private" field to the alias name, "isPrivate,"
       * in the data.
       */
      return {
        'data': {
          'allSnippets': [
            {
              'id': '1',
              'title': 'Media Item #1',
              'body': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
              'bodyPreview': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX',
              'created': '2018-06-13T08:02:21.517000+00:00',
              'isPrivate': true,
              'owner': 'john.smith',
              '__typename': 'SnippetType'
            },
            {
              'id': '2',
              'title': 'Chick Corea',
              'body': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\n\nThis shows a really long body. The body_preview or bodyPreview should truncate at a set # of chars.',
              'bodyPreview': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX',
              'created': '2012-04-23T18:25:43.511000+00:00',
              'isPrivate': true,
              'owner': 'admin',
              '__typename': 'SnippetType'
            },
            {
              'id': '3',
              'title': 'Blog Entry #3',
              'body': 'Chick Corea on the keyboards',
              'bodyPreview': 'Chick Corea on the keyboards',
              'created': '2021-07-16T18:36:50.206000+00:00',
              'isPrivate': false,
              'owner': 'admin',
              '__typename': 'SnippetType'
            },
          ],
          '__typename': 'Query'
        }
      };
    },
  },
];

it('renders without error', () => {
  const component = TestRenderer.create(
    <BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <AllSnippets />
      </MockedProvider>,
    </BrowserRouter>
  );

  const loading = component.root.findAllByProps({className: 'loading'});
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
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <AllSnippets />
        </MockedProvider>,
      </BrowserRouter>
    );

    await new Promise(resolve => setTimeout(resolve, 200 + (Math.random() * 300)));
  });


  // You can convert to JSON first then drill down from there.
  // console.log(component.toJSON()[0].children[1].children[1].children[1]);

  // When using findByProps or findAllByProps, be sure to use the React name,
  // not the HTML name. So use className instead of class, even though in the
  // DOM it's class.
  const titles = component.root.findAllByProps({className: 'col2'});
  const title_2 = titles[1].children;
  // console.log('title_2', title_2);

  // toContain can be used even though the array contains only one entry.
  // https://jestjs.io/docs/expect#tocontainitem
  expect(title_2).toContain('Chick Corea');
});
