import {MockedResponse} from '@apollo/client/testing';
import {CREATE_SNIPPET_MUTATION} from '../../src/pages/CreateSnippet';
import {ALL_SNIPPETS_QUERY} from '../../src/pages/AllSnippets';
import {newDataAllSnippets} from '../../src/pages/AllSnippets/mockFixturesAll';

type TGqlData = Record<string, unknown>;

const mockCreateInputVariables = [
  {
    'input': {
      'title': 'Before the Dawn',
      'body': 'He awoke before the dawn',
      'private': 'true',
      'owner': 'john.smith'
    }
  },
  {
    'input': {
      'title': 'Watch the sun rise',
      'body': 'At the bottom of the sea',
      'private': 'false',
      'owner': 'john.smith'
    }
  }
];

const newDataCreateSnippet = [
  {
    'data': {
      'createFormSnippet': {
        'snippet': {
          'id': '12',
          'title': 'Before the Dawn',
          'body': 'He awoke before the dawn',
          'private': 'true',
          'owner': 'john.smith'
        },
        'ok': true
      }
    }
  } as const,
  {
    'data': {
      'createFormSnippet': {
        'snippet': {
          'id': '13',
          'title': 'Watch the sun rise',
          'body': 'At the bottom of the sea',
          'private': 'false',
          'owner': 'john.smith'
        },
        'ok': true
      }
    }
  } as const
];

export let createMutationCalled = false;
export let refetchCalled = false;

export const mocks: readonly MockedResponse[] = [
  // CREATION # 0
  {
    request: {
      query: CREATE_SNIPPET_MUTATION,
      variables: mockCreateInputVariables[0],
    },
    newData: (): TGqlData => {
      console.log('create 0: fired');

      createMutationCalled = true;
      return newDataCreateSnippet[0];
    },
  },
  {
    request: {
      query: ALL_SNIPPETS_QUERY,
      variables: {},
    },
    newData: (): TGqlData => {
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
    newData: (): TGqlData => {
      console.log('create 1: fired');

      createMutationCalled = true;
      return newDataCreateSnippet[1];
    },
  },
  {
    request: {
      query: ALL_SNIPPETS_QUERY,
      variables: {},
    },
    newData: (): TGqlData => {
      console.log('refetch 1: fired');

      refetchCalled = true;
      return newDataAllSnippets();
    },
  },
];
