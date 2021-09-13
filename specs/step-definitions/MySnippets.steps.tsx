import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {StaticRouter} from 'react-router-dom';
import {loadFeature, defineFeature} from 'jest-cucumber';
import {MockedProvider} from '@apollo/client/testing';
import {noop, promiseTimeout} from '../../src/utils';
import MySnippets from '../../src/pages/MySnippets';
import Notice from '../../src/Notice';
import User from '../../src/pages/User/Signon';
import {signOffUser} from '../../src/pages/User/signoff';
import {
  loginMutationCalled,
  authenticatedUsername,
  authenticatedPassword,
  mocksAuthenticatedUser,
  mocksAnonymousUser
} from './MySnippets.mock';

/*
 * This page follows the basic outline from the jest-cucumber documentation
 * https://github.com/bencompton/jest-cucumber
 *
 * $ ./run_specifications.sh specs/step-definitions/MySnippets.steps.tsx
 */

const feature = loadFeature('../features/MySnippets.feature',
  {
    tagFilter: '@included and not @excluded',
    loadRelativePath: true
  });

defineFeature(feature, (test) => {
  let testRenderer = {};
  let testInstance: ReactTestInstance = (testRenderer as { root: ReactTestInstance }).root;

  beforeEach(() => {
    noop();
  });

  test('Show All Public Snippets to AnonymousUser', ({given, when, then}) => {
    given('an unauthenticated user, Jane Doe', () => {
      // For this step, trigger the logout function.
      // Technically this doesn't have to be done with mock data, but this allows
      // testing of logout.
      signOffUser();
    });

    when('Jane views the list of My Snippets', async () => {
      testRenderer = TestRenderer.create(
        <StaticRouter>
          <Notice />
          <MockedProvider mocks={mocksAnonymousUser} addTypename={false}>
            <MySnippets />
          </MockedProvider>,
        </StaticRouter>
      );

      // Ensure the relevant components rendered on the Creation page
      testInstance = (testRenderer as { root: ReactTestInstance }).root;
      //console.log('testInstance', testInstance);

      const mySnippets = testInstance.findByType(MySnippets);
      expect(mySnippets).toBeDefined();
      const notice = testInstance.findByType(Notice);
      expect(notice).toBeDefined();

      // Allow the mutation to fire
      await TestRenderer.act(async () => {
        await new Promise(resolve => promiseTimeout(resolve));
      });

    });

    then('she sees only public snippets', () => {
      // At present, private is shown with a green checkbox, and public is simply an
      // empty <div></div> cell.
      const isPrivate = testInstance.findAllByProps({className: 'col5'});
      isPrivate.forEach((cell) => expect(cell.props.children).toBe(''));
    });
  });

  test('Show All Owner Specific Snippets + Public Snippets to Authenticated User', ({given, when, then, and, but}) => {

    given('that John Smith has logged on', async () => {
      const testRenderer = TestRenderer.create(
        <StaticRouter>
          <MockedProvider mocks={mocksAuthenticatedUser} addTypename={false}>
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
      const expectedUsername = authenticatedUsername;
      const expectedPassword = authenticatedPassword;
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

    when('he views the list of My Snippets', async () => {
      testRenderer = TestRenderer.create(
        <StaticRouter>
          <Notice />
          <MockedProvider mocks={mocksAuthenticatedUser} addTypename={false}>
            <MySnippets />
          </MockedProvider>,
        </StaticRouter>
      );

      // Ensure the relevant components rendered on the Creation page
      testInstance = (testRenderer as { root: ReactTestInstance }).root;
      //console.log('testInstance', testInstance);

      const mySnippets = testInstance.findByType(MySnippets);
      expect(mySnippets).toBeDefined();
      const notice = testInstance.findByType(Notice);
      expect(notice).toBeDefined();

      // Allow the mutation to fire
      await TestRenderer.act(async () => {
        await new Promise(resolve => promiseTimeout(resolve));
      });

    });

    let privateCount = 0;
    let ownerCount = 0;
    then('he sees all PUBLIC snippets', () => {
      // At present, private is shown with a green checkbox, and public is simply an
      // empty <div></div> cell.
      const owner = testInstance.findAllByProps({className: 'col4'});
      const isPrivate = testInstance.findAllByProps({className: 'col5'});
      isPrivate.forEach((cell, index) => {
        if (cell.props.children !== '') {
          // It's a private cell. It should then be owned by this user.
          expect(owner[index].props.children).toBe(authenticatedUsername);
        } else {
          privateCount++;
        }
        if(owner[index].props.children === authenticatedUsername) {
          ownerCount++;
        }
      });

      // These are fixed constants based upon the fixture data
      expect(privateCount).toBe(4);
      expect(ownerCount).toBe(3);
    });

    and('he sees all of the snippets that he authored', () => {
      expect(ownerCount).toBe(3);
    });

    but('he does not see any PRIVATE snippets that he did not author', () => {
      // This was covered in the then() step.
      noop();
    });
  });
});
