import {MockedResponse} from '@apollo/client/testing';
import {TGqlData} from '../../src/types';
import {TOKEN_AUTH_MUTATION} from '../../src/pages/User/Signon';
import {LIMITED_SNIPPETS_QUERY} from '../../src/pages/MySnippets';
import {newDataMySnippets} from '../../src/pages/MySnippets/mockFixtures';

export const mockSignonInputVariables = (
  {
    'username': 'admin',
    'password': 'withscores4!'
  }
);

export const newDataSignon = (
  {
    'data': {
      'tokenAuth': {
        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvaG4uc21pdGgiLCJleHAiOjE2MzA1MjA5MTUsIm9yaWdJYXQiOjE2MzA1MjA2MTV9.y_mwXKOZj2yh73GeeuXi1lZzElIl3dketbfZ-3bmpxc',
        'payload': {
          'username': 'john.smith',
          'exp': 1630520915,
          'origIat': 1630520615
        },
        'refreshExpiresIn': 1631125415
      }
    }
  } as const
);

/*
 * The mock object defines:
 * request:
 *    indicates the GraphQL and variables of the operation
 * result:
 *    newData() supplies the shape of the response that is expected
 */
export let loginMutationCalled = false;
export const mocks: readonly MockedResponse[] = [
  // The mock for the authToken authentication step
  {
    request: {
      query: TOKEN_AUTH_MUTATION,
      variables: mockSignonInputVariables,
    },
    // newData: totally overrides result:
    newData: (): TGqlData => {
      // . . . arbitrary logic . . .
      console.log('mock newData 0: fired');

      loginMutationCalled = true;
      return newDataSignon;
    },
  },
  // Return the limited list of things
  {
    request: {
      query: LIMITED_SNIPPETS_QUERY,
      variables: {},
    },
    newData: () : TGqlData => {
      // . . . arbitrary logic . . .
      console.log('newData 0 fired');

      return newDataMySnippets();
    },
  },
];
