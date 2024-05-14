Feature: MainLayout Component

  Scenario: User updates dishes and cart
    Given the user is on the main layout page
    When the user updates dishes
    And the user adds a dish to the cart
    Then the cart should contain the added dish
    And the user updates the quantity of the dish in the cart
    And the user deletes the dish from the cart
    Then the cart should be empty