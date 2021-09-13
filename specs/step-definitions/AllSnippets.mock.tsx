import {MockedResponse} from '@apollo/client/testing';
import {TGqlData} from '../../src/types';
import {ALL_SNIPPETS_QUERY} from '../../src/pages/AllSnippets';
import {LOGIN_MUTATION} from '../../src/pages/User/SignonTokenless';

const newDataLogout = () => (
  {
    'data': {
      'logout': {
        'ok': true
      }
    }
  } as const
);

export const newDataAllSnippets = () => (
  {
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
  } as const
);

/*
 * The mock object defines:
 * request:
 *    indicates the GraphQL and variables of the operation
 * result:
 *    newData() supplies the shape of the response that is expected
 */
export const mocks: readonly MockedResponse[] = [
  // Initial logout
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {},
    },
    newData: (): TGqlData => {
      // . . . arbitrary logic . . .
      console.log('mock newData 0 fired');

      return newDataLogout();
    },
  },
  // Return all the things
  {
    request: {
      query: ALL_SNIPPETS_QUERY,
      variables: {},
    },
    newData: (): TGqlData => {
      // . . . arbitrary logic . . .
      console.log('mock newData 1 fired');

      return newDataAllSnippets();
    },
  },
];
