Feature: Display Snippets

  Specification brief: This specification will ensure that Snippets render. This may
  be only a specified snippet or all snippets.

  Remember: try to make your specifications as concrete as possible.

  Scenario: Display All Public Snippets To Anonymous User

  ScenariO brief: Anonymous, or public, users are also known as non-authenticated users.
  Essentially, they do not have an account, or if they do, they haven't signed on.

    Given Jane Doe, a non-authenticated user
    When Jane navigates to the 'All Snippets' page
    Then the system shows her only public snippets

  Scenario: Display All Snippets To Authenticated User

  ScenariO brief: An authenticated user has an account and has signed on through a
  logon validation process.

    Given John Smith, who has a valid account
    When the John authenticates
    And he navigates to the 'All Snippets' page
    Then the system shows him all public snippets
    And all snippets that he authored
    But not any private snippets that he did not author
