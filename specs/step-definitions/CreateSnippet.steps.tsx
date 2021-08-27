import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {StaticRouter} from 'react-router-dom';
import {loadFeature, defineFeature } from 'jest-cucumber';
import {MockedProvider} from '@apollo/client/testing';
import {noop, promiseTimeout} from '../../src/utils';
import CreateSnippet from '../../src/pages/CreateSnippet/index';
import {mocks, createMutationCalled, refetchCalled} from './CreateSnippet.mock';
import Notice from '../../src/Notice';

/*
 * This page follows the basic outline from the jest-cucumber documentation
 * https://github.com/bencompton/jest-cucumber
 *
 * Needed to add "jest" section to package.json to get this to work
 * $ yarn gherkin specs/step-definitions/CreateSnippet.steps.tsx
 * $ ./run_specifications.sh specs/step-definitions/CreateSnippet.steps.tsx
 */

// This is relative to <docroot>
const feature = loadFeature('specs/features/CreateSnippet.feature');

defineFeature(feature, (test) => {

  // Create the TestRenderer outside of the tests.
  // You don't want to do this in the beforeEach() or a step because
  // these are run for every entry in the Examples table and slows
  // down the test suite considerably.
  const testRenderer = TestRenderer.create(
    <StaticRouter>
      <Notice />
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateSnippet />
      </MockedProvider>,
    </StaticRouter>
  );

  const testInstance:ReactTestInstance = (testRenderer as { root: ReactTestInstance }).root;
  //console.log('testInstance', testInstance);

  // Make sure the relevant components rendered
  const createSnippet = testInstance.findByType(CreateSnippet);
  expect(createSnippet).toBeDefined();
  const notice = testInstance.findByType(Notice);
  expect(notice).toBeDefined();

  beforeEach(() => {
    noop('beforeEach');
  });

  // Note that I had to add "and" callback
  test('Successful creation of snippet', ({given, when, then, and}) => {
    let titleField: ReactTestInstance = {} as ReactTestInstance;
    let bodyField: ReactTestInstance = {} as ReactTestInstance;
    let isPrivateField: ReactTestInstance = {} as ReactTestInstance;

    given('Authorized user John Smith wishes to add a new snippet', () => {
      noop();
    });

    when(
      /^John supplies an appropriate (.*), (.*), and chooses a (.*) option$/,
      async (expectedTitle, expectedBody, expectedPrivacy) => {
        console.log('\ntitle:', expectedTitle, '\nbody:', expectedBody, '\nprivacy:', expectedPrivacy);

        // Find the form fields
        titleField = testInstance.findByProps({type: 'text', id: 'title'});
        bodyField = testInstance.findByProps({id: 'body'});
        isPrivateField = testInstance.findByProps({type: 'checkbox', id: 'private'});

        await TestRenderer.act(async () => {
          titleField.props.onChange({target: {value: expectedTitle}});
        });
        await TestRenderer.act(async () => {
          bodyField.props.onChange({target: {value: expectedBody}});
        });
        await TestRenderer.act(async () => {
          isPrivateField.props.onChange({target: {checked: expectedPrivacy}});  // Note: checked instead of value
        });

        expect(titleField.props.value).toBe(expectedTitle);
        expect(bodyField.props.value).toBe(expectedBody);
        expect(isPrivateField.props.checked).toBe(expectedPrivacy);
      });

    then(/the new snippet persists/, async () => {

      // Find the form (There can be only one)
      const form = testInstance.findByType('form');
      expect(form).toBeDefined();
      // console.log('form.props.onSubmit', form.props.onSubmit);

      await TestRenderer.act(async () => {
        // noop('Firing onSubmit');
        form.props.onSubmit({
          preventDefault: () => false
        });

        await new Promise(resolve => promiseTimeout(resolve));
      });

      // Did the mock gql newData fire as expected?
      expect(createMutationCalled).toBe(true);
      expect(refetchCalled).toBe(true);
    });

    and('John is notified that the snippet was created', () => {
      const notice = testInstance.findByProps({className: 'notice'});
      expect(notice).toBeDefined();
      expect(notice.props.children).toBe('Your snippet has been created');
    });

    and(/subscribers to the feed are notified/, () => {
      noop('AND2 Needs code');
    });
  });
});
