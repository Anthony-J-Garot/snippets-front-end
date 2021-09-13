Feature: Show Snippets

  Specification brief:

  This specification will ensure that a view of My Snippets is available.
  The intent is for:

  An authenticated user to see their own records as well as all public records.
  The AnonymousUser to see only public records.

  @excluded
  Scenario: Show All Public Snippets to AnonymousUser

  Anonymous, or public, users are also known as non-authenticated users.
  They do not have a system account (or if the user does, s/he has not
  signed on).

    Given an unauthenticated user, Jane Doe
    When Jane views the list of My Snippets
    Then she sees only public snippets

  @included
  Scenario: Show All Owner Specific Snippets + Public Snippets to Authenticated User

  An authenticated user has signed on to a registered account. They can
  see their own + public snippets.

    Given that John Smith has logged on
    When he views the list of My Snippets
    Then he sees all PUBLIC snippets
    And he sees all of the snippets that he authored
    But he does not see any PRIVATE snippets that he did not author
