import { Given, When, Then } from '@cucumber/cucumber';
import { render } from '@testing-library/react';
import MainLayout from './MainLayout';

// Mock dependencies
jest.mock('../../supabase/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: [{ id: 1, name: 'Dish 1' }] }),
    }),
  },
}));

let mainLayoutComponent;

Given('the user is on the main layout page', () => {
  mainLayoutComponent = render(<MainLayout />);
});

When('the user updates dishes', async () => {
  // Simulate updating dishes (may involve asynchronous operations)
  await mainLayoutComponent.updateDishes();
});

When('the user adds a dish to the cart', () => {
  // Simulate adding a dish to the cart
  mainLayoutComponent.addToCart({ id: 1, name: 'Dish 1' }, 1);
});

Then('the cart should contain the added dish', () => {
  // Verify that the added dish is present in the cart
  expect(mainLayoutComponent.cart).toContainEqual({ dish: { id: 1, name: 'Dish 1' }, quantity: 1 });
});

When('the user updates the quantity of the dish in the cart', () => {
  // Simulate updating the quantity of a dish in the cart
  mainLayoutComponent.updateCart(1, 2);
});

When('the user deletes the dish from the cart', () => {
  // Simulate deleting a dish from the cart
  mainLayoutComponent.deleteSelectedDish(1);
});

Then('the cart should be empty', () => {
  // Verify that the cart is empty
  expect(mainLayoutComponent.cart).toHaveLength(0);
});
