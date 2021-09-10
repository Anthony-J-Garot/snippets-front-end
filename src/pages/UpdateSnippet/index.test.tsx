import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import UpdateSnippet, {GET_SNIPPET_QUERY, UPDATE_SNIPPET_MUTATION} from './index';
import {StaticRouter} from 'react-router-dom';
import {ALL_SNIPPETS_QUERY} from '../AllSnippets';
import {newDataAllSnippets} from '../../../specs/step-definitions/AllSnippets.mock';
import {
  mockUpdateInputVariables,
  newDataGetSnippetQueryForUpdate,
  newDataUpdateSnippet,
  updateProps
} from './mockFixtures';
import {promiseTimeout} from '../../utils';
import { TGqlData } from '../../types';

/*
 * For standard (non Gherkin) unit tests, the jest framework works well enough.
 * https://jestjs.io/docs/expect
 *
 * To run just the tests in this file:
 * $ ./run_regulartests.sh src/pages/UpdateSnippet/
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
    newData: () : TGqlData => {
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
    newData: () : TGqlData => {
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
    newData: () : TGqlData => {
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
  const testRenderer = TestRenderer.create(
    <StaticRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateSnippet {...updateProps} />
      </MockedProvider>,
    </StaticRouter>
  );


  const testInstance = (testRenderer as { root: ReactTestInstance }).root;

  // Find the form fields
  const title = testInstance.findByProps({type: 'text', id: 'title'});
  const body = testInstance.findByProps({id: 'body'});
  const isPrivate = testInstance.findByProps({type: 'checkbox', id: 'private'});

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
  const form = testInstance.findByType('form');
  expect(form).toBeDefined();
  //console.log('form.props.onSubmit', form.props.onSubmit);

  await TestRenderer.act(async () => {
    form.props.onSubmit({
      preventDefault: () => false
    });

    await new Promise(resolve => promiseTimeout(resolve));
  });

  expect(title.props.value).toBe(expectedTitle);
  expect(body.props.value).toBe(expectedBody);
  expect(isPrivate.props.checked).toBe(expectedIsPrivate);

  // How did we do?
  expect(updateMutationCalled).toBe(true);
  expect(refetchCalled).toBe(true);
});
