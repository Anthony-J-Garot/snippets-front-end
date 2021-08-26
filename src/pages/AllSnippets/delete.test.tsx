import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import AllSnippets, {ALL_SNIPPETS_QUERY, DELETE_SNIPPET_MUTATION} from './index';
import {StaticRouter} from 'react-router-dom';
import {newDataAllSnippets, newDataDeleteSnippet} from './mockFixtures';

/*
 * This is just the delete test. I separated it from the All Snippets test even
 * though the code resides in index.tsx.
 *
 * To run just the tests in this file:
 * $ yarn test src/pages/AllSnippets/delete.test.tsx
 */

/*
 * Each mock object defines a request field (indicating the shape and variables of the operation to
 * match against) and a result field (indicating the shape of the response to return for that operation).
 */
let deleteMutationCalled = false;
let refetchCalled = false;
const mocks: readonly MockedResponse[] = [
  {
    request: {
      query: ALL_SNIPPETS_QUERY,
      variables: {},
    },
    newData: () => {
      // . . . arbitrary logic . . .
      console.log('newData 0 fired');

      // First time through is to load page data.
      // Only set refetchCalled after the delete occurred.
      if (deleteMutationCalled) {
        refetchCalled = true;
      }
      return newDataAllSnippets();
    },
  },
  {
    request: {
      query: DELETE_SNIPPET_MUTATION,
      variables: {id: '1'},
    },
    newData: () => {
      // . . . arbitrary logic . . .
      console.log('newData 1 fired');

      deleteMutationCalled = true;
      return newDataDeleteSnippet();
    },
  },
];

/*
 * Need <BrowseRouter> because of embedded <Link>s.
 */
it('should delete snippet', async () => {

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
  // console.log('instance', instance);

  // Make sure the component rendered
  const allSnippets = instance.findByType(AllSnippets);
  expect(allSnippets).toBeDefined();

  // See if any links were rendered
  // const Links = instance.findAllByProps({to: '#', className: 'deleteIcon'});
  // Links.forEach((value) => {
  //   console.log('value.props', value.props);
  // });

  // Find the delete link (There can be only one)
  const deleteLink = instance.findByProps({id: 'delete_1'});
  expect(deleteLink).toBeDefined();

  // Now click the delete icon link thing
  await TestRenderer.act(async () => {
    deleteLink.props.onClick({target: {value: ''}});

    await new Promise(resolve => setTimeout(resolve, 200 + (Math.random() * 300)));
  });

  // How did we do?
  expect(deleteMutationCalled).toBe(true);
  expect(refetchCalled).toBe(true);
});
