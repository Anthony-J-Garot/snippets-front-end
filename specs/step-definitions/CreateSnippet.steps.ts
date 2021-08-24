import {loadFeature, defineFeature} from 'jest-cucumber';
import CreateSnippet from '../../src/pages/CreateSnippet/index';
import {noop} from '../../src/utils.js';

/*
 * This page follows the basic outline from the jest-cucumber documentation
 * https://github.com/bencompton/jest-cucumber
 *
 * Needed to add "jest" section to package.json to get this to work
 * yarn test /specs/step-definitions/CreateSnippet.steps.ts/
 */

const feature = loadFeature('../features/CreateSnippet.feature');

defineFeature(feature, (test) => {
  let createSnippet: typeof CreateSnippet;

  beforeEach(() => {
    createSnippet = new CreateSnippet();
  });

  // Note that I had to add "and" callback
  test('Successful creation of snippet', ({given, when, then, and}) => {

    given('Authorized user John Smith wishes to add a new snippet', () => {
      noop(); // beforeEach() sets the initial state
    });

    when('John supplies an appropriate (.*), (.*), and chooses a (*) option', ({title, body, privacy}) => {
      console.log(title, body, privacy);
    });

    then('John is notified that the snippet was created', () => {
      // TODO Left off here
      // expect(coinStatus).toBe<CoinStatus>('CoinReturned');
    });

    and(/the new snippet persists/, () => {
      createSnippet.balance = 0;
    });
  });
});
