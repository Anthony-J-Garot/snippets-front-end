import {gql} from '@apollo/client';
import client from '../../ApolloClient';
import userStore from '../../Observables/userStore';
import {clearAuthToken, context} from '../../authentication';
import {PUBLIC_USER} from '../../constants';
import noticesStore from '../../Observables/noticesStore';

// Export for unit test availability
export const LOGOUT_MUTATION = gql`
mutation mutLogout {
  logout {
    ok
    id
  }
}
`;

// Logs off the a user on the front-end and back-end
export const signOffUser = (): void => {

  // Logoff, server-side
  client.mutate({
    mutation: LOGOUT_MUTATION,
    variables: {},
    context: context('signoff.ts')
  });

  // Logoff, client-side
  clearAuthToken();
  userStore.setUser(PUBLIC_USER);  // Clear the username (set to AnonymousUser)
  // Not sure why both of these are necessary
  client.cache.reset(); // Clear cache but doesn't fetch all active queries
  client.clearStore(); // Reset the InMemoryCache and re-poll

  // Let user know
  noticesStore.setNotice({notice: 'SUCCESS: You have signed off'});
};
