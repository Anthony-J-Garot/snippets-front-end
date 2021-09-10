import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {StaticRouter} from 'react-router-dom';
import {loadFeature, defineFeature} from 'jest-cucumber';
import {MockedProvider} from '@apollo/client/testing';
import {noop, promiseTimeout} from '../../src/utils';
import AllSnippets from '../../src/pages/AllSnippets/index';
import {mocks} from './AllSnippets.mock';
import Notice from '../../src/Notice';
import {signOffUser} from '../../src/pages/User/signoff';

/*
 * This page follows the basic outline from the jest-cucumber documentation
 * https://github.com/bencompton/jest-cucumber
 *
 * $ ./run_specifications.sh specs/step-definitions/AllSnippets.steps.tsx
 */

// This is relative to <docroot>
const feature = loadFeature('specs/features/AllSnippets.feature');

defineFeature(feature, (test) => {

  // Create the TestRenderer outside of the tests.
  // You don't want to do this in the beforeEach() or within a step because these are
  // run for every entry in the Examples table, slows things down, and gives erroneous
  // results when incrementing counts.
  const testRendererCreate = TestRenderer.create(
    <StaticRouter>
      <Notice />
      <MockedProvider mocks={mocks} addTypename={false}>
        <AllSnippets />
      </MockedProvider>,
    </StaticRouter>
  );

  // Ensure the relevant components rendered on the Creation page
  const testInstanceCreate: ReactTestInstance = (testRendererCreate as { root: ReactTestInstance }).root;
  //console.log('testInstanceCreate', testInstanceCreate);
  const allSnippets = testInstanceCreate.findByType(AllSnippets);
  expect(allSnippets).toBeDefined();
  const notice = testInstanceCreate.findByType(Notice);
  expect(notice).toBeDefined();

  beforeEach(() => {
    noop('beforeEach');
  });

  test('Show All Public Snippets Regardless of User', ({given, when, then}) => {

    given('that public user Jane Doe does not have a system account', async () => {
      // This essentially ensures that no one is logged in.
      // Unnecessary because that's the default state, but it ensures the logout code is covered.
      noop('SIGN OFF USER');
      signOffUser();

      // Just wait for the mutation to fire
      await TestRenderer.act(async () => {
        await new Promise(resolve => promiseTimeout(resolve));
      });

    });

    when('Jane views a list of All Snippets', () => {
      noop('WHEN CLAUSE');
    });

    then('she sees all snippets', async () => {
      noop('THEN CLAUSE');

      // Just wait for the mutation to fire
      await TestRenderer.act(async () => {
        await new Promise(resolve => promiseTimeout(resolve));
      });

      // Did the mock gql newData fire as expected?
      noop('Needs tests');
    });
  });
});
