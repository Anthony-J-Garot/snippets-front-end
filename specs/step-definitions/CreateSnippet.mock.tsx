export const mockCreateInputVariables = [
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

export const newDataCreateSnippet = () => (
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
