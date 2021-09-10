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
  let testRenderer = {};
  let testInstance: ReactTestInstance = (testRenderer as { root: ReactTestInstance }).root;

  beforeEach(() => {
    noop('beforeEach()');
  });

  test('Show All Public Snippets Regardless of User', ({given, when, then}) => {

    given('that public user Jane Doe does not have a system account', async () => {
      // This essentially ensures that no one is logged in.
      // Unnecessary because that's the default state, but it ensures the logout code is covered.
      signOffUser();
    });

    when('Jane views a list of All Snippets', async () => {
      testRenderer = TestRenderer.create(
        <StaticRouter>
          <Notice />
          <MockedProvider mocks={mocks} addTypename={false}>
            <AllSnippets />
          </MockedProvider>,
        </StaticRouter>
      );

      // Ensure the relevant components rendered on the Creation page
      testInstance = (testRenderer as { root: ReactTestInstance }).root;
      //console.log('testInstance', testInstance);

      const allSnippets = testInstance.findByType(AllSnippets);
      expect(allSnippets).toBeDefined();
      const notice = testInstance.findByType(Notice);
      expect(notice).toBeDefined();

      // Allow the mutation to fire
      await TestRenderer.act(async () => {
        await new Promise(resolve => promiseTimeout(resolve));
      });

    });

    then('Jane sees all the snippets', () => {
      // When using findByProps or findAllByProps, be sure to use the React name,
      // not the HTML name. So use className instead of class, even though in the
      // DOM it's class.
      const titles = testInstance.findAllByProps({className: 'col2'});
      const title_2 = titles[1].children;

      // toContain() can be used even though the array contains only one entry.
      // https://jestjs.io/docs/expect#tocontainitem
      expect(title_2).toContain('Chick Corea');
    });
  });
});
