/*
 Common fixture data used in unit test mocks.
 */


// Note that I switched the "private" field to the alias name "isPrivate"
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

export const newDataDeleteSnippet = () => (
  {
    'data': {
      'deleteSnippet': {
        'ok': true
      }
    }
  } as const
);
