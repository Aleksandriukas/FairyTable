Feature: Integration Test
  As a user
  I want to perform integration testing
  So that I can verify that different components of the application work together correctly

  Scenario: User logs in and accesses dashboard
    Given the user is on the login page
    When the user enters valid credentials
    And the user clicks the login button
    Then the user should be redirected to the dashboard
    And the dashboard should display the user's profile information
