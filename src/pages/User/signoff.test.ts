import {signOffUser} from './signoff';
import {getAuthToken, setAuthToken} from '../../authentication';
import userStore from '../../Observables/userStore';

/*
 * For standard (non Gherkin) unit tests, the jest framework works well enough.
 * https://jestjs.io/docs/expect
 *
 * To run just the tests in this file:
 * $ ./run_regulartests.sh src/pages/User/signoff.test.ts
 */

it('should sign-off user', () => {

  // Set up an authenticated user
  const token = 'ABCDEFG';
  const username = 'john.smith';
  setAuthToken(token);
  userStore.setUser({id: 2, username: username});

  // Ensure it's set
  expect(getAuthToken()).toBe(token);
  expect(userStore.getUsername()).toBe(username);

  // Logoff
  signOffUser();

  // Ensure all good things
  expect(getAuthToken()).toBe('');
  expect(userStore.getUsername()).toBe('AnonymousUser');
  expect(userStore.getUserId()).toBe(3);
});
