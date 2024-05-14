Feature: Quantity Picker
  As a user
  I want to be able to increment and decrement a quantity
  So that I can select the desired quantity for a product

  Scenario: Incrementing the quantity
    Given I have a QuantityPicker component with quantity set to 3
    When I tap the plus button
    Then the quantity should increase to 4

  Scenario: Decrementing the quantity
    Given I have a QuantityPicker component with quantity set to 3
    When I tap the minus button
    Then the quantity should decrease to 2

  Scenario: Quantity cannot go below 1
    Given I have a QuantityPicker component with quantity set to 1
    When I tap the minus button
    Then the quantity should remain at 1

  Scenario: Quantity cannot go above 99
    Given I have a QuantityPicker component with quantity set to 99
    When I tap the plus button
    Then the quantity should remain at 99
