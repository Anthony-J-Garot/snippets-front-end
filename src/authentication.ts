import {isBrowser} from './utils';

// Define an authToken wrapper function because localStorage
// doesn't exist when testing.
export const getAuthToken = (): string => {
  // console.log('process.title', process.title);
  // console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  if (!isBrowser()) return '';

  let authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.log('Generating new authToken');
    authToken = newAuthToken();

  } else {
    console.log('User already authenticated with token [' + authToken + ']');
  }

  return authToken;
};

// After generating, store it right away.
export const newAuthToken = (): string => {
  // Could probably do something more robust than this, but
  // since this is just a proof of concept . . .
  // Store the newly generated token
  const authToken = 'ABCDEFG';
  setAuthToken(authToken);
  return authToken;
};

export const clearAuthToken = (): void => {
  setAuthToken('');
  console.log('Token was cleared');
};

// Not exporting this just yet. I can't think of a reason
// someone else would have to do this.
const setAuthToken = (authToken: string): void => {
  if (isBrowser()) {
    localStorage.setItem('authToken', authToken);
  }
};
