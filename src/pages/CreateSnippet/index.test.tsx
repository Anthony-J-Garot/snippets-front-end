import React from 'react';
import TestRenderer from 'react-test-renderer';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import CreateSnippet, {CREATE_SNIPPET_MUTATION} from './index';
import {BrowserRouter} from 'react-router-dom';
import {ALL_SNIPPETS_QUERY} from '../AllSnippets';

/*
 * For standard (non Gherkin) unit tests, the jest framework works well enough.
 * https://jestjs.io/docs/expect
 *
 * To run just the tests in this file:
 * $ yarn test src/pages/CreateSnippet/
 */

export const newDataCreateSnippet = () => {
  return {
    'data': {
      'createFormSnippet': {
        'snippet': {
          'id': '12',
          'title': 'Rodan',
          'body': 'This does not actually have to match the inputs above.',
          'private': true,
          'owner': 'admin'
        },
        'ok': true
      }
    }
  };
};

export const newDataAllSnippets = () => {
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
};

let createMutationCalled = false;
let refetchCalled = false;
const mocks: readonly MockedResponse[] = [
  // The mock for the creation step
  {
    request: {
      query: CREATE_SNIPPET_MUTATION,
      variables: {
        'input': {
          'title': 'Godzilla',
          'body': 'With a purposeful grimace and a terrible sound\nHe pulls the spitting high tension wires down',
          'private': false
        }
      },
    },
    // newData totally overrides result
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
  const instance = component.root;

  // Make sure the component rendered
  const createSnippet = instance.findByType(CreateSnippet);
  expect(createSnippet).toBeDefined();

  // Find the submit button (There can be only one)
  const submitButton = instance.findByType('button');
  expect(submitButton).toBeDefined();
  expect(submitButton.props.children).toBe('Create Snippet');
});

it('should create shippet', async () => {
  const component = TestRenderer.create(
    <BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateSnippet />
      </MockedProvider>,
    </BrowserRouter>
  );

  // The "test instance"
  const instance = component.root;

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
