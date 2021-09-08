import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {StaticRouter} from 'react-router-dom';
import {loadFeature, defineFeature} from 'jest-cucumber';
import {MockedProvider} from '@apollo/client/testing';
import {noop, promiseTimeout} from '../../src/utils';
import CreateSnippet from '../../src/pages/CreateSnippet/index';
import {
  mocks,
  createMutationCalled,
  refetchCalled,
  mocksSubscription,
  subscriptionMutationCalled
} from './CreateSnippet.mock';
import Notice from '../../src/Notice';
import userStore from '../../src/Observables/userStore';
import SubscribeSnippet, {transactions} from '../../src/pages/SubscribeSnippet';

/*
 * This page follows the basic outline from the jest-cucumber documentation
 * https://github.com/bencompton/jest-cucumber
 *
 * $ ./run_specifications.sh specs/step-definitions/CreateSnippet.steps.tsx
 */

// This is relative to <docroot>
const feature = loadFeature('specs/features/CreateSnippet.feature');

defineFeature(feature, (test) => {

  // Create the TestRenderer outside of the tests.
  // You don't want to do this in the beforeEach() or within a step because these are
  // run for every entry in the Examples table, slows things down, and gives erroneous
  // results when incrementing counts.
  const testRendererCreate = TestRenderer.create(
    <StaticRouter>
      <Notice />
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateSnippet />
      </MockedProvider>,
    </StaticRouter>
  );

  const testRendererSubscription = TestRenderer.create(
    <StaticRouter>
      <MockedProvider mocks={mocksSubscription} addTypename={false}>
        <SubscribeSnippet />
      </MockedProvider>,
    </StaticRouter>
  );

  // Ensure the relevant components rendered on the Creation page
  const testInstanceCreate: ReactTestInstance = (testRendererCreate as { root: ReactTestInstance }).root;
  //console.log('testInstanceCreate', testInstanceCreate);
  const createSnippet = testInstanceCreate.findByType(CreateSnippet);
  expect(createSnippet).toBeDefined();
  const notice = testInstanceCreate.findByType(Notice);
  expect(notice).toBeDefined();

  // Ensure the relevant components rendered on the Subscription page
  const testInstanceSubscription: ReactTestInstance = (testRendererSubscription as { root: ReactTestInstance }).root;
  // console.log('testInstanceSubscription', testInstanceSubscription);
  const pageTitle = testInstanceSubscription.findByProps({className: 'App-page-title'});
  expect(pageTitle).toBeDefined();
  expect(pageTitle.props.children).toBe('Real-time Subscription Feed');


  beforeEach(() => {
    noop('beforeEach');
  });

  // Note that I had to add "and" callback
  test('Successful creation of snippet', ({given, when, then, and}) => {
    let titleField: ReactTestInstance = {} as ReactTestInstance;
    let bodyField: ReactTestInstance = {} as ReactTestInstance;
    let isPrivateField: ReactTestInstance = {} as ReactTestInstance;

    given('Authorized user John Smith wishes to add a new snippet', () => {
      // This essentially logs in the user John Smith
      userStore.setUser({username: 'john.smith'});
    });

    when(
      /^John supplies an appropriate (.*), (.*), and chooses a (.*) option$/,
      async (expectedTitle, expectedBody, expectedPrivacy) => {
        console.log('\ntitle:', expectedTitle, '\nbody:', expectedBody, '\nprivacy:', expectedPrivacy);

        // Find the form fields
        titleField = testInstanceCreate.findByProps({type: 'text', id: 'title'});
        bodyField = testInstanceCreate.findByProps({id: 'body'});
        isPrivateField = testInstanceCreate.findByProps({type: 'checkbox', id: 'private'});

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
      const form = testInstanceCreate.findByType('form');
      expect(form).toBeDefined();
      // console.log('form.props.onSubmit', form.props.onSubmit);

      await TestRenderer.act(async () => {
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
      const notice = testInstanceCreate.findByProps({className: 'notice'});
      expect(notice).toBeDefined();
      expect(notice.props.children).toBe('Your snippet has been created');
    });

    and(/subscribers to the feed are notified/, async () => {
      // The mocked response will have already fired. An integration test is
      // better suited to testing a subscription than a unit test or a step
      // in a step-definition because running each Example in the Scenario
      // Outline doesn't trigger anything.

      // How did we do?
      // The subscription mutation (from the mock) should have fired once.
      expect(subscriptionMutationCalled).toBe(1);
      // And we should have 2 Transactions, i.e. the initial seed feed item
      // sent from the code and the mocked one when rendered above.
      expect(transactions.length).toBe(2);
      // Can even ensure it passed through correctly from the mock
      expect(transactions[1].snippet.title).toBe('Media Item #1');
    });
  });
});
