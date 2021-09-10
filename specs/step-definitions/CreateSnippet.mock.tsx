import {MockedResponse} from '@apollo/client/testing';
import {CREATE_SNIPPET_MUTATION} from '../../src/pages/CreateSnippet';
import {ALL_SNIPPETS_QUERY} from '../../src/pages/AllSnippets';
import {newDataAllSnippets} from './AllSnippets.mock';
import {SNIPPET_NOGROUP_SUBSCRIPTION} from '../../src/pages/SubscribeSnippet';
import {newDataFeedItem} from '../../src/pages/SubscribeSnippet/mockFixtures';
import {TGqlData} from '../../src/types';

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
export let subscriptionMutationCalled = 0;

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

export const mocksSubscription: readonly MockedResponse[] = [
  {
    request: {
      query: SNIPPET_NOGROUP_SUBSCRIPTION,
      variables: {}, // no inputs necessary for this particular (no-group) subscription
    },
    // newData totally overrides result
    newData: (): TGqlData => {
      // . . . arbitrary logic . . .
      console.log('mockSubscription newData 0: fired');

      subscriptionMutationCalled++;
      return newDataFeedItem();
    },
  },
];
