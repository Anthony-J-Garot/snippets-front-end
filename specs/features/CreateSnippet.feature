Feature: Create Snippet

  Specification brief: In the specification brief I might describe why this
  specification was created in the first place. For example, the motivation
  behind this particular specification was to learn Gherkin.

  Remember: try to make your specifications as concrete as possible.

  Scenario: Successful creation of snippet

  ScenariO brief: ScenariOs tell stories about people who use the system according to
  specific rules.

  A snippet is just a made-up record of words, like a blog or article. In this case,
  each snippet must have a title and body. The privacy defaults to true.

    Given John Smith has navigated to the 'Add Snippet' form
    When John supplies and appropriate <title>, <body>, and chooses a <privacy> option
      | title              | body                     | privacy |
      | Before the Dawn    | He awoke before the dawn | true    |
      | Watch the sun rise | At the bottom of the sea | false   |
    Then John is notified that the snippet was created
    And the new snippet persists
