Feature: OrderItem Component

  Scenario: Display OrderItem
    Given I have an OrderItem component
    Then I should see the dish title
    And I should see the quantity
    And I should see the price