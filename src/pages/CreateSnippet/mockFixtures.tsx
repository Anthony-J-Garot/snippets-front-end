
export const mockCreateInputVariables = {
  'input': {
    'title': 'Godzilla',
    'body': 'With a purposeful grimace and a terrible sound\nHe pulls the spitting high tension wires down',
    'private': false,
    'owner': 'AnonymousUser'
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
          'owner': 'admin'
        },
        'ok': true
      }
    }
  } as const
);
