import {MockedResponse} from '@apollo/client/testing';
import {TGqlData} from '../../src/types';
import {TOKEN_AUTH_MUTATION} from '../../src/pages/User/Signon';
import {LIMITED_SNIPPETS_QUERY} from '../../src/pages/MySnippets';
import {
  newDataMySnippetsAnonymousUser,
  newDataMySnippetsAuthenticatedUser
} from '../../src/pages/MySnippets/mockFixtures';
import {LOGOUT_MUTATION} from '../../src/pages/User/signoff';

export const authenticatedUsername = 'john.smith';
export const authenticatedPassword = 'withscores4!';

const mockAuthenticatedUserVariables = (
  {
    'username': authenticatedUsername,
    'password': authenticatedPassword
  }
);

// Using JWT tokenAuth
const newDataTokenAuthResponse = (
  {
    'data': {
      'tokenAuth': {
        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvaG4uc21pdGgiLCJleHAiOjE2MzA1MjA5MTUsIm9yaWdJYXQiOjE2MzA1MjA2MTV9.y_mwXKOZj2yh73GeeuXi1lZzElIl3dketbfZ-3bmpxc',
        'payload': {
          'username': authenticatedUsername,
          'exp': 1630520915,
          'origIat': 1630520615
        },
        'refreshExpiresIn': 1631125415
      }
    }
  } as const
);

const newDataLogout = (
  {
    'data': {
      'logout': {
        'ok': true,
        'id': '2'
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
export let logoutMutationCalled = false;
export const mocksAuthenticatedUser: readonly MockedResponse[] = [
  // The mock for the authToken authentication step
  {
    request: {
      query: TOKEN_AUTH_MUTATION,
      variables: mockAuthenticatedUserVariables,
    },
    // newData: totally overrides result:
    newData: (): TGqlData => {
      // . . . arbitrary logic . . .
      console.log('mock newData 0: fired');

      loginMutationCalled = true;
      return newDataTokenAuthResponse;
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
      console.log('mock newData 1 fired');

      return newDataMySnippetsAuthenticatedUser;
    },
  },
  // The mock for logout.
  {
    request: {
      query: LOGOUT_MUTATION,
      variables: {},
    },
    // newData: totally overrides result:
    newData: (): TGqlData => {
      // . . . arbitrary logic . . .
      console.log('mock newData 2: fired');

      logoutMutationCalled = true;
      return newDataLogout;
    },
  },
];

loginMutationCalled = false;
export const mocksAnonymousUser: readonly MockedResponse[] = [
  // Return the limited list of things
  {
    request: {
      query: LIMITED_SNIPPETS_QUERY,
      variables: {},
    },
    newData: () : TGqlData => {
      // . . . arbitrary logic . . .
      console.log('mock newData 1 fired');

      return newDataMySnippetsAnonymousUser;
    },
  },
];
