# # features/step_definitions/main_layout_steps.rb

# # require 'react_test_renderer'
# # require_relative '../../src/components/MainLayout'

# # Mock dependencies
# # RSpec.configure do |config|
# #   config.before(:each) do
# #     allow(Supabase).to receive(:from).and_return(
# #       double('supabase',
# #         select: double('select', call: [{ id: 1, name: 'Dish 1' }])
# #       )
# #     )
# #   end
# # end

# Before do
#   @main_layout_component = ReactTestRenderer.create(React.createElement(MainLayout))
# end

# Given('the user is on the main layout page') do
#   # No action needed as the component is already rendered in the Before hook
# end

# When('the user updates dishes') do
#   # Simulate updating dishes (may involve asynchronous operations)
#   @main_layout_component.update_dishes
# end

# When('the user adds a dish to the cart') do
#   # Simulate adding a dish to the cart
#   @main_layout_component.add_to_cart({ id: 1, name: 'Dish 1' }, 1)
# end

# Then('the cart should contain the added dish') do
#   # Verify that the added dish is present in the cart
#   expect(@main_layout_component.cart).to include({ dish: { id: 1, name: 'Dish 1' }, quantity: 1 })
# end

# When('the user updates the quantity of the dish in the cart') do
#   # Simulate updating the quantity of a dish in the cart
#   @main_layout_component.update_cart(1, 2)
# end

# When('the user deletes the dish from the cart') do
#   # Simulate deleting a dish from the cart
#   @main_layout_component.delete_selected_dish(1)
# end

# Then('the cart should be empty') do
#   # Verify that the cart is empty
#   expect(@main_layout_component.cart).to be_empty
# end

# Then('this step always passes') do
#   pending 'This step always passes'
# end