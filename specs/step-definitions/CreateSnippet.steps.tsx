import {loadFeature, defineFeature} from 'jest-cucumber';
import CreateSnippet from '../../src/pages/CreateSnippet/index';
import {noop} from '../../src/utils';
import TestRenderer, {ReactTestInstance} from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {MockedProvider} from '@apollo/client/testing';
import React from 'react';

/*
 * This page follows the basic outline from the jest-cucumber documentation
 * https://github.com/bencompton/jest-cucumber
 *
 * Needed to add "jest" section to package.json to get this to work
 * $ yarn gherkin specs/step-definitions/CreateSnippet.steps.tsx
 */

const feature = loadFeature('../features/CreateSnippet.feature');

defineFeature(feature, (test) => {
  let instance: ReactTestInstance;

  beforeEach(() => {
    const component = TestRenderer.create(
      <BrowserRouter>
        <MockedProvider addTypename={false}>
          <CreateSnippet />
        </MockedProvider>,
      </BrowserRouter>
    );

    // The "test instance"
    instance = (component as { root: ReactTestInstance }).root;

    // Make sure the component rendered
    const createSnippet = instance.findByType(CreateSnippet);
    expect(createSnippet).toBeDefined();
  });

  // Note that I had to add "and" callback
  test('Successful creation of snippet', ({given, when, then, and}) => {
    let titleField:ReactTestInstance = {} as ReactTestInstance;
    let bodyField:ReactTestInstance = {} as ReactTestInstance;
    let isPrivateField:ReactTestInstance = {} as ReactTestInstance;

    given('Authorized user John Smith wishes to add a new snippet', () => {
      noop(); // beforeEach() sets the initial state
    });

    when(
      'John supplies an appropriate (.*), (.*), and chooses a (*) option',
      async ({expectedTitle, expectedBody, expectedIsPrivate}) => {
        console.log(expectedTitle, expectedBody, expectedIsPrivate);

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
          isPrivateField.props.onChange({target: {checked: expectedIsPrivate}});  // Note: checked instead of value
        });

        expect(titleField.props.value).toBe(expectedTitle);
        expect(bodyField.props.value).toBe(expectedBody);
        expect(isPrivateField.props.checked).toBe(expectedIsPrivate);
      });

    then('John is notified that the snippet was created', () => {
      // expect(coinStatus).toBe<CoinStatus>('CoinReturned');
    });

    and(/the new snippet persists/, () => {
      // expect(coinStatus).toBe<CoinStatus>('CoinReturned');
    });
  });
});
