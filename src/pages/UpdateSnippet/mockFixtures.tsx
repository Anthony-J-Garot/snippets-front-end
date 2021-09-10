import {IUpdateProps} from './index';

// Define an arbitrary snippetId that will be used for all mock data for the update
export const updateProps: IUpdateProps = {} as IUpdateProps;
updateProps.snippetId = '818';
export const now = new Date().toISOString();

export const mockUpdateInputVariables = {
  'id': updateProps.snippetId,
  'input': {
    'title': 'Godzilla',
    'body': 'With a purposeful grimace and a terrible sound\nHe pulls the spitting high tension wires down',
    'private': false,
    'created': now
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
        'created': now,
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
