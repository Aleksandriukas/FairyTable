Feature: OrderItem Integration

  Scenario: Display OrderItem
    Given I have opened the OrderItem component
    Then I should see the dish title
    And I should see the quantity
    And I should see the price
