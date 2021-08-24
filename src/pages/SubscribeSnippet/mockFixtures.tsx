
// This is an example for the feed item when a snippet had been deleted.
export const newDataFeedItem = () => (
  {
    'data': {
      'onSnippetNoGroup': {
        'sender': 'SENDER',
        'snippet': {
          'id': '1',
          'title': 'Media Item #1',
          'private': true,
          'created': '2018-06-13T08:02:21.517000+00:00',
          'body': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
          '__typename': 'SnippetType'
        },
        'transType': 'DELETE',
        'ok': true,
        '__typename': 'OnSnippetNoGroup'
      }
    }
  } as const
);
