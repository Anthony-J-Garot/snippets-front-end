import React from 'react';
import TestRenderer from 'react-test-renderer';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import CreateSnippet, {CREATE_SNIPPET_MUTATION} from './index';
import {BrowserRouter} from 'react-router-dom';

/*
 * For standard (non Gherkin) unit tests, the jest framework works well enough.
 * https://jestjs.io/docs/expect
 *
 * To run just the tests in this file:
 * $ yarn test src/pages/CreateSnippet/
 */

const mocks: readonly MockedResponse[] = [
  {
    request: {
      query: CREATE_SNIPPET_MUTATION,
      variables: {},
    },
    result: () => {
      // . . . arbitrary logic . . .
      // console.log("arbitrary logic");

      return {};
    },
  },
];

it('renders without error', () => {
  const component = TestRenderer.create(
    <BrowserRouter>
      <MockedProvider addTypename={false}>
        <CreateSnippet />
      </MockedProvider>,
    </BrowserRouter>
  );

  // Find this:
  // <p className="App-page-title">Create Snippet</p>
  const pageTitle = component.root.findAllByProps({className: 'App-page-title'});
  //console.log("children ", pageTitle[0].children);
  expect(pageTitle[0].children).toContain('Create Snippet');
});

/*
 * Need <BrowseRouter> because of embedded <Link>s.
 */
// it('should render rows', async () => {
//
//   let component = {};
//   await TestRenderer.act(async () => {
//     component = await TestRenderer.create(
//       <BrowserRouter>
//         <MockedProvider mocks={mocks} addTypename={false}>
//           <AllSnippets />
//         </MockedProvider>,
//       </BrowserRouter>
//     );
//
//     await new Promise(resolve => setTimeout(resolve, 200 + (Math.random() * 300)));
//   });
//
//
//   // You can convert to JSON first then drill down from there.
//   // console.log(component.toJSON()[0].children[1].children[1].children[1]);
//
//   // When using findByProps or findAllByProps, be sure to use the React name,
//   // not the HTML name. So use className instead of class, even though in the
//   // DOM it's class.
//   const titles = component.root.findAllByProps({className: 'col2'});
//   const title_2 = titles[1].children;
//   // console.log('title_2', title_2);
//
//   // toContain can be used even though the array contains only one entry.
//   // https://jestjs.io/docs/expect#tocontainitem
//   expect(title_2).toContain('Chick Corea');
// });
