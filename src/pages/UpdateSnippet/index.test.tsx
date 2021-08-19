import React, {PropsWithChildren} from 'react';
import TestRenderer from 'react-test-renderer';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import UpdateSnippet, {GET_SNIPPET_QUERY, UPDATE_SNIPPET_MUTATION} from './index';
import {BrowserRouter} from 'react-router-dom';
import {ALL_SNIPPETS_QUERY} from '../AllSnippets';

/*
 * For standard (non Gherkin) unit tests, the jest framework works well enough.
 * https://jestjs.io/docs/expect
 *
 * To run just the tests in this file:
 * $ yarn test src/pages/UpdateSnippet/
 */

// Define an arbitrary snippetId that will be used for all mock data for the update
const updateProps: PropsWithChildren<{ snippetId: string }> = {snippetId: '818'};

const mockUpdateInputVariables = {
  'id': updateProps.snippetId,
  'input': {
    'title': 'Godzilla',
    'body': 'With a purposeful grimace and a terrible sound\nHe pulls the spitting high tension wires down',
    'private': false
  }
};

export const newDataGetSnippetQueryForUpdate = () => {
  return {
    'data': {
      'snippetById': {
        'id': mockUpdateInputVariables.id,
        'title': mockUpdateInputVariables.input.title,
        'body': mockUpdateInputVariables.input.body,
        'private': mockUpdateInputVariables.input.private,
        'owner': 'john.smith',
        'created': '2021-07-16T18:36:50.206000+00:00',
        '__typename': 'SnippetType'
      }
    }
  };
};

export const newDataUpdateSnippet = (snippetId: string) => {
  return {
    'data': {
      'updateSnippet': {
        'snippet': {
          'id': snippetId,
          'title': 'Rodan',
          'body': 'This does not actually have to match the inputs above.',
          'bodyPreview': 'This does not actually have to match the inputs above.',
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
      return newDataUpdateSnippet(updateProps.snippetId);
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
// it('renders without error', () => {
//   const component = TestRenderer.create(
//     <BrowserRouter>
//       <MockedProvider addTypename={false}>
//         <UpdateSnippet {...updateProps} />
//       </MockedProvider>,
//     </BrowserRouter>
//   );
//
//
//   // The "test instance"
//   const instance = component.root;
//
//   // Make sure the component rendered
//   const updateSnippet = instance.findByType(UpdateSnippet);
//   expect(updateSnippet).toBeDefined();
//
//   // Find the submit button (There can be only one)
//   const submitButton = instance.findByType('button');
//   expect(submitButton).toBeDefined();
//   expect(submitButton.props.children).toBe('Update Snippet');
// });

it('should update snippet', async () => {
  const component = TestRenderer.create(
    <BrowserRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateSnippet {...updateProps} />
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
