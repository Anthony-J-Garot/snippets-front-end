import {loadFeature, defineFeature} from 'jest-cucumber';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {StaticRouter} from 'react-router-dom';
import {MockedProvider} from '@apollo/client/testing';
import React from 'react';
import CreateSnippet from '../../src/pages/CreateSnippet/index';
import {noop} from '../../src/utils';

/*
 * This page follows the basic outline from the jest-cucumber documentation
 * https://github.com/bencompton/jest-cucumber
 *
 * Needed to add "jest" section to package.json to get this to work
 * $ yarn gherkin specs/step-definitions/CreateSnippet.steps.tsx
 */

// This is relative to <docroot>
const feature = loadFeature('specs/features/CreateSnippet.feature');

defineFeature(feature, (test) => {
  let instance: ReactTestInstance;

  beforeEach(() => {
    noop();
  });

  // Note that I had to add "and" callback
  test('Successful creation of snippet', ({given, when, then, and}) => {
    let titleField: ReactTestInstance = {} as ReactTestInstance;
    let bodyField: ReactTestInstance = {} as ReactTestInstance;
    let isPrivateField: ReactTestInstance = {} as ReactTestInstance;

    given('Authorized user John Smith wishes to add a new snippet', () => {
      // Recall that beforeEach() sets the initial state,
      // but I think I will use that for Backgrounds.

      const component = TestRenderer.create(
        <StaticRouter>
          <MockedProvider addTypename={false}>
            <CreateSnippet />
          </MockedProvider>,
        </StaticRouter>
      );

      // The "test instance"
      instance = (component as { root: ReactTestInstance }).root;

      // Make sure the component rendered
      const createSnippet = instance.findByType(CreateSnippet);
      expect(createSnippet).toBeDefined();
    });

    when(
      /^John supplies an appropriate (.*), (.*), and chooses a (.*) option$/,
      async (arg0, arg1, arg2, table) => {

        // Find the form fields
        titleField = instance.findByProps({type: 'text', id: 'title'});
        bodyField = instance.findByProps({id: 'body'});
        isPrivateField = instance.findByProps({type: 'checkbox', id: 'private'});

        for (const whenRow of table) {
          // console.log(whenRow);

          await TestRenderer.act(async () => {
            titleField.props.onChange({target: {value: whenRow.title}});
          });
          await TestRenderer.act(async () => {
            bodyField.props.onChange({target: {value: whenRow.body}});
          });
          await TestRenderer.act(async () => {
            isPrivateField.props.onChange({target: {checked: whenRow.privacy}});  // Note: checked instead of value
          });

          expect(titleField.props.value).toBe(whenRow.title);
          expect(bodyField.props.value).toBe(whenRow.body);
          expect(isPrivateField.props.checked).toBe(whenRow.privacy);
        }
      });

    then('John is notified that the snippet was created', () => {
      // expect(coinStatus).toBe<CoinStatus>('CoinReturned');
    });

    and(/the new snippet persists/, () => {
      // expect(coinStatus).toBe<CoinStatus>('CoinReturned');
    });

    and(/subscribers to the feed are notified/, () => {
      // expect(coinStatus).toBe<CoinStatus>('CoinReturned');
    });
  });
});
