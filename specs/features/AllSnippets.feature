Feature: Show Snippets

  Specification brief:

  This specification will ensure that a view of ALL Snippets is available.
  The intent is to be able to view, at a glance, all records in the DB.
  In a Public-facing App, this functionality would only be available to
  an Admin user. But for this Pilot App, having a dump of all records,
  with the ability to delete and edit, is a useful tool for coding
  authenticated pages.

  Scenario: Show All Public Snippets Regardless of User

  Django has a built-in user called AnonymousUser for an un-authenticated
  user. This idea has been brought into the front-end code. An un-authenticated
  user either is un-registered (no system account) or hasn't signed in. The
  ramifications are the same.

    Given that public user Jane Doe does not have a system account
    When Jane views a list of All Snippets
    Then Jane sees all the snippets
