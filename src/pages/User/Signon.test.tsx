import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import User, {TOKEN_AUTH_MUTATION} from './Signon';
import {StaticRouter} from 'react-router-dom';
import {mockSignonInputVariables, newDataSignon} from '../../../specs/step-definitions/MySnippets.mock';
import {promiseTimeout} from '../../utils';
import {TGqlData} from '../../types';

/*
 * For standard (non Gherkin) unit tests, the jest framework works well enough.
 * https://jestjs.io/docs/expect
 *
 * To run just the tests in this file:
 * $ ./run_regulartests.sh src/pages/User/Signon.test.tsx
 */

let loginMutationCalled = false;
const mocks: readonly MockedResponse[] = [
  // The mock for the authToken authentication step
  {
    request: {
      query: TOKEN_AUTH_MUTATION,
      variables: mockSignonInputVariables,
    },
    // newData: totally overrides result:
    newData: (): TGqlData => {
      // . . . arbitrary logic . . .
      console.log('mock newData 0: fired');

      loginMutationCalled = true;
      return newDataSignon;
    },
  },
];

/*
 * Need <BrowseRouter> because of embedded <Link>s.
 */
it('renders without error', () => {
  const testRenderer = TestRenderer.create(
    <StaticRouter>
      <MockedProvider addTypename={false}>
        <User />
      </MockedProvider>,
    </StaticRouter>
  );

  const testInstance = (testRenderer as { root: ReactTestInstance }).root;

  // Make sure the component rendered
  const userComponent = testInstance.findByType(User);
  expect(userComponent).toBeDefined();

  // Find the submit button (There can be only one)
  const submitButton = testInstance.findByType('button');
  expect(submitButton).toBeDefined();
  expect(submitButton.props.children).toBe('Login');
});

it('should create snippet', async () => {
  const testRenderer = TestRenderer.create(
    <StaticRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <User />
      </MockedProvider>,
    </StaticRouter>
  );

  const testInstance = (testRenderer as { root: ReactTestInstance }).root;

  // Find the form fields
  const usernameField = testInstance.findByProps({type: 'text', id: 'username'});
  const passwordField = testInstance.findByProps({id: 'password'});

  // Update the values to something I can track later.
  // Updates should fire off the setFormState event.
  // I must specify each FormEvent object that is expected
  // in SnippetFormFields.tsx, e.g. e.target.value
  const expectedUsername = mockSignonInputVariables.username;
  const expectedPassword = mockSignonInputVariables.password;
  await TestRenderer.act(async () => {
    usernameField.props.onChange({target: {value: expectedUsername}});
  });
  await TestRenderer.act(async () => {
    passwordField.props.onChange({target: {value: expectedPassword}});
  });

  expect(usernameField.props.value).toBe(expectedUsername);
  expect(passwordField.props.value).toBe(expectedPassword);

  // Find the form (There can be only one)
  const form = testInstance.findByType('form');
  expect(form).toBeDefined();
  //console.log('form.props.onSubmit', form.props.onSubmit);

  await TestRenderer.act(async () => {
    form.props.onSubmit({
      preventDefault: () => false
    });

    await new Promise(resolve => promiseTimeout(resolve));
  });

  // How did we do?
  expect(loginMutationCalled).toBe(true);
});
