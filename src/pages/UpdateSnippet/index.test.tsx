import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import UpdateSnippet, {GET_SNIPPET_QUERY, UPDATE_SNIPPET_MUTATION} from './index';
import {StaticRouter} from 'react-router-dom';
import {ALL_SNIPPETS_QUERY} from '../AllSnippets';
import {newDataAllSnippets} from '../AllSnippets/mockFixtures';
import {
  mockUpdateInputVariables,
  newDataGetSnippetQueryForUpdate,
  newDataUpdateSnippet,
  updateProps
} from './mockFixtures';

/*
 * For standard (non Gherkin) unit tests, the jest framework works well enough.
 * https://jestjs.io/docs/expect
 *
 * To run just the tests in this file:
 * $ yarn test src/pages/UpdateSnippet/
 */


let updateMutationCalled = false;
let refetchCalled = false;
const mocks: readonly MockedResponse[] = [

  // The mock to populate the page
  {
    request: {
      query: GET_SNIPPET_QUERY,
      variables: {'id': updateProps.snippetId},
    },
    // newData totally overrides result
    newData: () => {
      // . . . arbitrary logic . . .
      console.log('mock newData 0: fired');

      return newDataGetSnippetQueryForUpdate();
    },
  },

  // The mock for the update step
  {
    request: {
      query: UPDATE_SNIPPET_MUTATION,
      variables: mockUpdateInputVariables,
    },
    // newData totally overrides result
    newData: () => {
      // . . . arbitrary logic . . .
      console.log('mock newData 1: fired');

      updateMutationCalled = true;
      return newDataUpdateSnippet();
    },
  },

  // The mock when refetch queries is run
  {
    request: {
      query: ALL_SNIPPETS_QUERY,
      variables: {},
    },
    // newData totally overrides result
    newData: () => {
      // . . . arbitrary logic . . .
      console.log('mock newData 2: fired');

      refetchCalled = true;
      return newDataAllSnippets();
    },
  },
];

/*
 * Need <BrowseRouter> because of embedded <Link>s.
 */
it('should update snippet', async () => {
  const component = TestRenderer.create(
    <StaticRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateSnippet {...updateProps} />
      </MockedProvider>,
    </StaticRouter>
  );

  // The "test instance"
  const instance = (component as {root:ReactTestInstance}).root;

  // Find the form fields
  const title = instance.findByProps({type: 'text', id: 'title'});
  const body = instance.findByProps({id: 'body'});
  const isPrivate = instance.findByProps({type: 'checkbox', id: 'private'});

  // Update the values to something I can track later.
  // Updates should fire off the setFormState event.
  // I must specify each FormEvent object that is expected
  // in SnippetFormFields.tsx, e.g. e.target.value
  const expectedTitle = mockUpdateInputVariables.input.title;
  const expectedBody = mockUpdateInputVariables.input.body;
  const expectedIsPrivate = mockUpdateInputVariables.input.private;

  await TestRenderer.act(async () => {
    title.props.onChange({target: {value: expectedTitle}});
  });
  await TestRenderer.act(async () => {
    body.props.onChange({target: {value: expectedBody}});
  });
  await TestRenderer.act(async () => {
    isPrivate.props.onChange({target: {checked: expectedIsPrivate}});  // Note: checked instead of value
  });

  // Find the form (There can be only one)
  const form = instance.findByType('form');
  expect(form).toBeDefined();
  //console.log('form.props.onSubmit', form.props.onSubmit);

  await TestRenderer.act(async () => {
    form.props.onSubmit({
      preventDefault: () => false
    });

    await new Promise(resolve => setTimeout(resolve, 200 + (Math.random() * 300)));
  });

  expect(title.props.value).toBe(expectedTitle);
  expect(body.props.value).toBe(expectedBody);
  expect(isPrivate.props.checked).toBe(expectedIsPrivate);

  // How did we do?
  expect(updateMutationCalled).toBe(true);
  expect(refetchCalled).toBe(true);
});
