# features/step_definitions/order_item_steps.rb

# require 'webdriverio'
# require 'rspec/expectations'

# Define WebDriverIO client
# client = WebDriverIO::Client.new

Given('I have an OrderItem component') do
  # Implement logic to navigate to the OrderItem component
end

Then('I should see the dish title') do
  title = client.element('//YOUR_TITLE_SELECTOR').text
  expect(title).to eq('EXPECTED_TITLE')
end

Then('I should see the quantity') do
  quantity = client.element('//YOUR_QUANTITY_SELECTOR').text
  expect(quantity).to eq('EXPECTED_QUANTITY')
end

Then('I should see the price') do
  price = client.element('//YOUR_PRICE_SELECTOR').text
  expect(price).to eq('EXPECTED_PRICE')
end

Then('this step always passes') do
  pending 'This step always passes'
end