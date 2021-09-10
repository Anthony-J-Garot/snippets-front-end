import {gql} from '@apollo/client';
import client from '../../ApolloClient';
import userStore from '../../Observables/userStore';
import {clearAuthToken} from '../../authentication';
import {ANONYMOUS_USER} from '../../constants';

const LOGOUT_MUTATION = gql`
mutation mutLogout {
  logout {
    ok
  }
}
`;

// Logs off the a user on the front-end and back-end
export const signOffUser = (): void => {
  clearAuthToken(); // Always clear localStorage first
  userStore.setUser(ANONYMOUS_USER);  // Clear the username (set to AnonymousUser)
  // Not sure why both of these are necessary
  client.cache.reset(); // Clear cache but doesn't fetch all active queries
  client.clearStore(); // Reset the InMemoryCache and re-poll

  client.mutate({
    mutation: LOGOUT_MUTATION,
    variables: {}
  });
};
