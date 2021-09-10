export const newDataMySnippets = () => (
  {
    'data': {
      'limitedSnippets': [
        {
          'id': '1',
          'title': 'Media Item #1',
          'bodyPreview': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX',
          'owner': 'john.smith',
          'isPrivate': true,
          '__typename': 'SnippetType'
        },
        {
          'id': '3',
          'title': 'Chick Corea Elektric Band',
          'bodyPreview': 'Chick Corea on the keyboards',
          'owner': 'admin',
          'isPrivate': false,
          '__typename': 'SnippetType'
        },
        {
          'id': '4',
          'title': 'Musical Item #4',
          'bodyPreview': 'Herbie Hancock',
          'owner': 'john.smith',
          'isPrivate': false,
          '__typename': 'SnippetType'
        },
        {
          'id': '7',
          'title': 'Miles Davis',
          'bodyPreview': 'A Kind of Blue',
          'owner': 'admin',
          'isPrivate': false,
          '__typename': 'SnippetType'
        },
        {
          'id': '9',
          'title': 'Blue Oyster Cult',
          'bodyPreview': 'Needs more cowbell\n...\n',
          'owner': 'Rudi the Rottweiler',
          'isPrivate': false,
          '__typename': 'SnippetType'
        },
        {
          'id': '13',
          'title': 'Bluetech - Holotrope',
          'bodyPreview': 'Holotrope: A Movement Towards Wholeness In 4 Parts',
          'owner': 'john.smith',
          'isPrivate': true,
          '__typename': 'SnippetType'
        }
      ],
      '__typename': 'Query'
    }
  } as const
);
