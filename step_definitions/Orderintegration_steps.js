const { Given, Then } = require('cucumber');
const { expect } = require('chai');
const { $, browser } = require('webdriverio');

Given('I have opened the OrderItem component', async () => {
  // Implement logic to navigate to the OrderItem component
});

Then('I should see the dish title', async () => {
  const title = await $('//YOUR_TITLE_SELECTOR').getText();
  expect(title).to.equal('EXPECTED_TITLE');
});

Then('I should see the quantity', async () => {
  const quantity = await $('//YOUR_QUANTITY_SELECTOR').getText();
  expect(quantity).to.equal('EXPECTED_QUANTITY');
});

Then('I should see the price', async () => {
  const price = await $('//YOUR_PRICE_SELECTOR').getText();
  expect(price).to.equal('EXPECTED_PRICE');
});
