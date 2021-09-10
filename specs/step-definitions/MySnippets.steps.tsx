import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {StaticRouter} from 'react-router-dom';
import {loadFeature, defineFeature} from 'jest-cucumber';
import {MockedProvider} from '@apollo/client/testing';
import {noop, promiseTimeout} from '../../src/utils';
import MySnippets from '../../src/pages/MySnippets';
import {loginMutationCalled, mocks} from './MySnippets.mock';
import Notice from '../../src/Notice';
import User from '../../src/pages/User/Signon';
import {mockSignonInputVariables} from './MySnippets.mock';

/*
 * This page follows the basic outline from the jest-cucumber documentation
 * https://github.com/bencompton/jest-cucumber
 *
 * $ ./run_specifications.sh specs/step-definitions/MySnippets.steps.tsx
 */

// This is relative to <docroot>
const feature = loadFeature('specs/features/MySnippets.feature');

defineFeature(feature, (test) => {
  let testRenderer = {};
  let testInstance: ReactTestInstance = (testRenderer as { root: ReactTestInstance }).root;

  beforeEach(() => {
    noop('beforeEach()');
  });

  test('Show All Public Snippets to AnonymousUser', ({given, when, then}) => {
    given('an unauthenticated user, Jane Doe', () => {
      noop('GIVEN: TODO');
    });

    when('Jane views the list of My Snippets', () => {
      noop('WHEN: TODO');
    });

    then('she sees only public snippets', () => {
      noop('THEN: TODO');
    });
  });

  test('Show All Owner Specific Snippets + Public Snippets to Authenticated User', ({given, when, then, and, but}) => {

    given('that John Smith has logged on', async () => {
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

    when('he views the list of My Snippets', async () => {
      testRenderer = TestRenderer.create(
        <StaticRouter>
          <Notice />
          <MockedProvider mocks={mocks} addTypename={false}>
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

    then('he sees all PUBLIC snippets', () => {
      // When using findByProps or findAllByProps, be sure to use the React name,
      // not the HTML name. So use className instead of class, even though in the
      // DOM it's class.
      const titles = testInstance.findAllByProps({className: 'col2'});
      const title_2 = titles[1].children;

      // toContain() can be used even though the array contains only one entry.
      // https://jestjs.io/docs/expect#tocontainitem
      expect(title_2).toContain('Chick Corea Elektric Band');
    });

    and('he sees all of the snippets that he authored', () => {
      noop('AND: TODO');
    });

    but('he does not see any PRIVATE snippets that he did not author', () => {
      noop('BUT: TODO');
    });
  });
});
