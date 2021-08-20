import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import CreateSnippet, {CREATE_SNIPPET_MUTATION} from './index';
import {BrowserRouter} from 'react-router-dom';
import {ALL_SNIPPETS_QUERY} from '../AllSnippets';
import {mockCreateInputVariables, newDataCreateSnippet} from './mockFixtures';
import {newDataAllSnippets} from '../AllSnippets/mockFixtures';

/*
 * For standard (non Gherkin) unit tests, the jest framework works well enough.
 * https://jestjs.io/docs/expect
 *
 * To run just the tests in this file:
 * $ yarn test src/pages/CreateSnippet/
 */


let createMutationCalled = false;
let refetchCalled = false;
const mocks: readonly MockedResponse[] = [
  // The mock for the creation step
  {
    request: {
      query: CREATE_SNIPPET_MUTATION,
      variables: mockCreateInputVariables,
    },
    // newData: totally overrides result:
    newData: () => {
      // . . . arbitrary logic . . .
      console.log('mock newData 0: fired');

      createMutationCalled = true;
      return newDataCreateSnippet();
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
      console.log('mock newData 1: fired');

      refetchCalled = true;
      return newDataAllSnippets();
    },
  },
];

/*
 * Need <BrowseRouter> because of embedded <Link>s.
 */
it('renders without error', () => {
  const component = TestRenderer.create(
    <BrowserRouter>
      <MockedProvider addTypename={false}>
        <CreateSnippet />
      </MockedProvider>,
    </BrowserRouter>
  );

  // The "test instance"
  const instance = (component as {root:ReactTestInstance}).root;

  // Make sure the component rendered
  const createSnippet = instance.findByType(CreateSnippet);
  expect(createSnippet).toBeDefined();

  // Find the submit button (There can be only one)
  const submitButton = instance.findByType('button');
  expect(submitButton).toBeDefined();
  expect(submitButton.props.children).toBe('Create Snippet');
});

it('should create snippet', async () => {
  const component = TestRenderer.create(
    <BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateSnippet />
      </MockedProvider>,
    </BrowserRouter>
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
  const expectedTitle = 'Godzilla';
  const expectedBody = '' +
    'With a purposeful grimace and a terrible sound\n' +
    'He pulls the spitting high tension wires down';
  const expectedIsPrivate = false;
  await TestRenderer.act(async () => {
    title.props.onChange({target: {value: expectedTitle}});
  });
  await TestRenderer.act(async () => {
    body.props.onChange({target: {value: expectedBody}});
  });
  await TestRenderer.act(async () => {
    isPrivate.props.onChange({target: {checked: expectedIsPrivate}});  // Note: checked instead of value
  });

  expect(title.props.value).toBe(expectedTitle);
  expect(body.props.value).toBe(expectedBody);
  expect(isPrivate.props.checked).toBe(expectedIsPrivate);

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

  // How did we do?
  expect(createMutationCalled).toBe(true);
  expect(refetchCalled).toBe(true);
});
