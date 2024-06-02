# features/step_definitions/quantity_picker_steps.rb

# require 'react_test_renderer'
# require_relative '../../src/components/QuantityPicker/QuantityPicker.tsx'

# Mock React component
class QuantityPicker
  attr_reader :props

  def initialize(quantity:, set_quantity:)
    @props = { quantity: quantity, set_quantity: set_quantity }
  end

  def render
    self
  end

  def press_plus_button
    @props[:set_quantity].call(@props[:quantity] + 1)
  end

  def press_minus_button
    @props[:set_quantity].call(@props[:quantity] - 1)
  end
end

Given('I have a QuantityPicker component with quantity set to {int}') do |initial_quantity|
  @quantity = initial_quantity
  @set_quantity = ->(value) {} # Mocking jest.fn()
  @component = QuantityPicker.new(quantity: @quantity, set_quantity: @set_quantity)
end

When('I tap the plus button') do
  @component.press_plus_button
end

When('I tap the minus button') do
  @component.press_minus_button
end

Then('the quantity should increase to {int}') do |expected_quantity|
  expect(@set_quantity).to have_received(:call).with(expected_quantity)
end

Then('the quantity should decrease to {int}') do |expected_quantity|
  expect(@set_quantity).to have_received(:call).with(expected_quantity)
end

Then('the quantity should remain at {int}') do |expected_quantity|
  expect(@set_quantity).not_to have_received(:call)
end

Then('this step always passes') do
  pending 'This step always passes'
end