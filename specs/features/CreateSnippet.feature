Feature: Create Snippet

  Specification brief:

  [In the specification brief I might describe why this specification was
  created in the first place.]

  "The motivation behind this particular specification was to learn Gherkin.
  Specifically, this specification ensures that a 'snippet' is created
  properly by a user."

  [Remember: Try to make your specifications as concrete as possible, and
  don't write about buttons, forms, links, and input fields when possible.]

  Scenario Outline: Successful creation of snippet

  Outline brief:

  [The scenario tells stories about people who use the system according to
  specific rules.]

  "A snippet is a made-up record of words, like a blog or article. In this case,
  each snippet must have a title and body. The privacy defaults to true, but can
  be set by the author upon creation and edit. The owner field is set to whomever
  created the snippet."

    Given Authorized user John Smith wishes to add a new snippet
    When John supplies an appropriate <title>, <body>, and chooses a <privacy> option
    Then the new snippet persists
    And John is notified that the snippet was created
    And subscribers to the feed are notified

    Examples:
      | title              | body                     | privacy |
      | Before the Dawn    | He awoke before the dawn | true    |
      | Watch the sun rise | At the bottom of the sea | false   |
