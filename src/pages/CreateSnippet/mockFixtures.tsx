
export const mockCreateInputVariables = {
  'input': {
    'title': 'Godzilla',
    'body': 'With a purposeful grimace and a terrible sound\nHe pulls the spitting high tension wires down',
    'private': false,
    'user': 3
  }
};

export const newDataCreateSnippet = () => (
  {
    'data': {
      'createFormSnippet': {
        'snippet': {
          'id': '12',
          'title': 'Rodan',
          'body': 'This does not actually have to match the inputs above.',
          'private': true,
          'owner': null,
          'user': {
            'id': 3,
            'username': 'Noop',
            'email': 'noop@noop.com'
          }
        },
        'ok': true
      }
    }
  } as const
);
