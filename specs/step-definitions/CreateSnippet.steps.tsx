import React from 'react';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {StaticRouter} from 'react-router-dom';
import {loadFeature, defineFeature} from 'jest-cucumber';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import {noop} from '../../src/utils';
import CreateSnippet, {CREATE_SNIPPET_MUTATION} from '../../src/pages/CreateSnippet/index';
import {mockCreateInputVariables, newDataCreateSnippet} from './CreateSnippet.mock';
import {ALL_SNIPPETS_QUERY} from '../../src/pages/AllSnippets';
import {newDataAllSnippets} from '../../src/pages/AllSnippets/mockFixtures';

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

  let createMutationCalled = false;
  let refetchCalled = false;
  const mocks: readonly MockedResponse[] = [
    // CREATION # 0
    {
      request: {
        query: CREATE_SNIPPET_MUTATION,
        variables: mockCreateInputVariables[0],
      },
      newData: () => {
        console.log('create 0: fired');

        createMutationCalled = true;
        return newDataCreateSnippet();
      },
    },
    {
      request: {
        query: ALL_SNIPPETS_QUERY,
        variables: {},
      },
      newData: () => {
        console.log('refetch 0: fired');

        refetchCalled = true;
        return newDataAllSnippets();
      },
    },

    // CREATION # 1
    {
      request: {
        query: CREATE_SNIPPET_MUTATION,
        variables: mockCreateInputVariables[1],
      },
      newData: () => {
        console.log('create 1: fired');

        createMutationCalled = true;
        return newDataCreateSnippet();
      },
    },
    {
      request: {
        query: ALL_SNIPPETS_QUERY,
        variables: {},
      },
      newData: () => {
        console.log('refetch 1: fired');

        refetchCalled = true;
        return newDataAllSnippets();
      },
    },
  ];

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
          <MockedProvider mocks={mocks} addTypename={false}>
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
      async (expectedTitle, expectedBody, expectedPrivacy) => {
        console.log('\ntitle:', expectedTitle, '\nbody:', expectedBody, '\nprivacy:', expectedPrivacy);

        // Find the form fields
        titleField = instance.findByProps({type: 'text', id: 'title'});
        bodyField = instance.findByProps({id: 'body'});
        isPrivateField = instance.findByProps({type: 'checkbox', id: 'private'});

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
      const form = instance.findByType('form');
      expect(form).toBeDefined();
      // console.log('form.props.onSubmit', form.props.onSubmit);

      await TestRenderer.act(async () => {
        noop('Firing onSubmit');
        form.props.onSubmit({
          preventDefault: () => false
        });

        await new Promise(resolve => setTimeout(resolve, 200 + (Math.random() * 300)));
      });

      // How did we do?
      expect(createMutationCalled).toBe(true);
      expect(refetchCalled).toBe(true);
    });

    and('John is notified that the snippet was created', () => {
      noop('AND1 Needs code');
    });

    and(/subscribers to the feed are notified/, () => {
      noop('AND2 Needs code');
    });
  });
});
