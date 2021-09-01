export const mockSignonInputVariables = (
  {
    'username': 'admin',
    'password': 'withscores4!'
  }
);

export const newDataSignon = (
  {
    'data': {
      'tokenAuth': {
        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImpvaG4uc21pdGgiLCJleHAiOjE2MzA1MjA5MTUsIm9yaWdJYXQiOjE2MzA1MjA2MTV9.y_mwXKOZj2yh73GeeuXi1lZzElIl3dketbfZ-3bmpxc',
        'payload': {
          'username': 'john.smith',
          'exp': 1630520915,
          'origIat': 1630520615
        },
        'refreshExpiresIn': 1631125415
      }
    }
  } as const
);
