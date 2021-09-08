import {IUpdateProps} from './index';

// Define an arbitrary snippetId that will be used for all mock data for the update
export const updateProps: IUpdateProps = {} as IUpdateProps;
updateProps.snippetId = '818';

export const mockUpdateInputVariables = {
  'id': updateProps.snippetId,
  'input': {
    'title': 'Godzilla',
    'body': 'With a purposeful grimace and a terrible sound\nHe pulls the spitting high tension wires down',
    'private': false,
    'owner': 'AnonymousUser',
  }
};

export const newDataGetSnippetQueryForUpdate = () => (
  {
    'data': {
      'snippetById': {
        'id': mockUpdateInputVariables.id,
        'title': mockUpdateInputVariables.input.title,
        'body': mockUpdateInputVariables.input.body,
        'private': mockUpdateInputVariables.input.private,
        'owner': 'john.smith',
        'created': '2021-07-16T18:36:50.206000+00:00',
        '__typename': 'SnippetType'
      }
    }
  } as const
);

export const newDataUpdateSnippet = () => (
  {
    'data': {
      'updateSnippet': {
        'snippet': {
          'id': updateProps.snippetId,
          'title': 'Rodan',
          'body': 'This does not actually have to match the inputs above.',
          'bodyPreview': 'This does not actually have to match the inputs above.',
          'private': true,
          'owner': 'admin'
        },
        'ok': true
      }
    }
  } as const
);
