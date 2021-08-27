export const mockLoginInputVariables = {
  'input': {
    'username': 'admin',
    'password': 'withscores4!'
  }
};

export const newDataLogin = () => (
  {
    'data': {
      'login': {
        'ok': true
      }
    }
  } as const
);
