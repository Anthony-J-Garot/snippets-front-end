import {isBrowser} from './utils';

/*
 * These routines are roughly slapped together. I wasn't 100% sure where
 * I was going with authentication. These functions may or may not get
 * repurposed for JWT.
 */

// Returns token or empty string.
// This is called from a variety of places, including the connection to
// the WebSocket. The optional 'origin' is so I can trace who called it.
export const getAuthToken = (origin?: string): string => {

  // localStorage doesn't exist when testing through Jest.
  // Could also check:
  //   console.log('process.title', process.title);
  //   console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  if (!isBrowser()) return '';

  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.log('getAuthToken(' + origin + '): User not authenticated');
    return '';
  } else {
    console.log('getAuthToken(' + origin + '): User authenticated with token [' + authToken + ']');
    return authToken;
  }
};

export const clearAuthToken = (): void => {
  localStorage.clear();
  // setAuthToken('');
  console.log('localStorage token was cleared');
};

export const setAuthToken = (authToken: string): void => {
  if (isBrowser()) {
    // I may want to add stuff to the token
    // localStorage.setItem('authToken', JSON.stringify(authToken));

    localStorage.setItem('authToken', authToken);
  }
};

// This was sort of a placeholder for functionality. It's likely to be deprecated.
export const generateLocalAuthToken = (): string => {
  // Could generate a unique authToken, but since this is just a proof of concept . . .
  const authToken = 'ABCDEFG';
  console.log('generateLocalAuthToken', authToken);

  // After generating, store it right away.
  setAuthToken(authToken);
  return authToken;
};