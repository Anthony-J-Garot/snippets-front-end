import {loadFeature, defineFeature} from 'jest-cucumber';
import CreateSnippet from '../../src/pages/CreateSnippet/index';
import {noop} from '../../src/utils.js';

const feature = loadFeature('../features/CreateSnippet.feature');

defineFeature(feature, (test) => {
  let createSnippet: typeof CreateSnippet;

  beforeEach(() => {
    createSnippet = new CreateSnippet();
  });

  // Note that I had to add "and" callback
  test('Successful creation of snippet', ({given, when, then, and}) => {

    given('a web browser is at the \'Add Snippet\' user form', () => {
      noop(); // beforeEach() sets the initial state
    });

    when('the user supplies a (.*), (.*), and chooses the (.*)', ({title, body, privacy}) => {
      console.log(title, body, privacy);
    });

    then('the system notifies the user of snippet acceptance', () => {
      // TODO Left off here
      // expect(coinStatus).toBe<CoinStatus>('CoinReturned');
    });

    and(/the new snippet persists/, () => {
      createSnippet.balance = 0;
    });
  });
});
