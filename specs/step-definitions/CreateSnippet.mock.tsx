import {MockedResponse} from "@apollo/client/testing";
import {CREATE_SNIPPET_MUTATION} from "../../src/pages/CreateSnippet";
import {ALL_SNIPPETS_QUERY} from "../../src/pages/AllSnippets";
import {newDataAllSnippets} from "../../src/pages/AllSnippets/mockFixtures";

const mockCreateInputVariables = [
  {
    'input': {
      'title': 'Before the Dawn',
      'body': 'He awoke before the dawn',
      'private': 'true'
    }
  },
  {
    'input': {
      'title': 'Watch the sun rise',
      'body': 'At the bottom of the sea',
      'private': 'false'
    }
  }
];

const newDataCreateSnippet = () => (
  {
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
  } as const
);

export var createMutationCalled = false;
export var refetchCalled = false;

export const mocks: readonly MockedResponse[] = [
  // CREATION # 0
  {
    request: {
      query: CREATE_SNIPPET_MUTATION,
      variables: mockCreateInputVariables[0],
    },
    newData: () => {
      console.log('create 0: fired');

      createMutationCalled = true;
      return newDataCreateSnippet();
    },
  },
  {
    request: {
      query: ALL_SNIPPETS_QUERY,
      variables: {},
    },
    newData: () => {
      console.log('refetch 0: fired');

      refetchCalled = true;
      return newDataAllSnippets();
    },
  },

  // CREATION # 1
  {
    request: {
      query: CREATE_SNIPPET_MUTATION,
      variables: mockCreateInputVariables[1],
    },
    newData: () => {
      console.log('create 1: fired');

      createMutationCalled = true;
      return newDataCreateSnippet();
    },
  },
  {
    request: {
      query: ALL_SNIPPETS_QUERY,
      variables: {},
    },
    newData: () => {
      console.log('refetch 1: fired');

      refetchCalled = true;
      return newDataAllSnippets();
    },
  },
];
