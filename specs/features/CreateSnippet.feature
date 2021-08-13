Feature: Create Snippet

  Scenario: Successful creation of snippet
    Given a web browser is at the 'Add Snippet' user form
    When the user supplies a <title>, <body>, and chooses the <privacy>
      | title           | body                     | privacy |
      | Before the Dawn | He awoke before the dawn | true    |
    Then the system notifies the user of snippet acceptance
    And the new snippet persists
