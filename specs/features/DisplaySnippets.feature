Feature: Display Snippets

  Specification brief: This specification will ensure that Snippets render. This may
  be only a specified snippet or all snippets.

  Remember: Try to make your specifications as concrete as possible, and
  don't write about buttons, forms, links, and input fields when possible.

  Scenario: Display All Public Snippets To Anonymous User

  ScenariO brief: Anonymous, or public, users are also known as non-authenticated users.
  Essentially, they do not have an account, or if they do, they haven't signed on.

    Given an unregistered user, Jane Doe
    When Jane views a list of snippets
    Then she sees only the public snippets

  Scenario: Display All Relevant Snippets To an Authenticated User

  ScenariO brief: An authenticated user has an account and has signed on through a
  sign-on validation process.

    Given a registered user with a valid account, John Smith
    And John has signed on to the system
    When he views a list of snippets
    Then the system shows him all PUBLIC snippets
    And all of the snippets that he authored
    But not any of the PRIVATE snippets that he did not author
