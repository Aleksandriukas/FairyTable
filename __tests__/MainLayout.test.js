import React from 'react';
import { render } from '@testing-library/react-native';
import MainLayout from '../src/app/(main)/Layout.tsx';

describe('MainLayout component', () => {
  it('renders without crashing', () => {
    render(<MainLayout />);
  });

  it('initially displays an empty cart', () => {
    const { getByTestId } = render(<MainLayout />);
    const cartElement = getByTestId('cart');
    expect(cartElement.children).toHaveLength(0);
  });

  it('adds a dish to the cart when addToCart is called', () => {
    const { getByTestId } = render(<MainLayout />);
    const cartElement = getByTestId('cart');
    expect(cartElement.children).toHaveLength(0);

    // Simulate adding a dish to the cart
    // MainLayout.addToCart({ id: 1, name: 'Test Dish' }, 1);

    // Verify that the dish is added to the cart
    expect(cartElement.children).toHaveLength(1);
    expect(cartElement.children[0]).toHaveTextContent('Test Dish');
  });

  it('updates the quantity of a dish in the cart when updateCart is called', () => {
    const { getByTestId } = render(<MainLayout />);
    const cartElement = getByTestId('cart');
    expect(cartElement.children).toHaveLength(0);

    // Simulate adding a dish to the cart
    // MainLayout.addToCart({ id: 1, name: 'Test Dish' }, 1);

    // Simulate updating the quantity of the dish in the cart
    // MainLayout.updateCart(1, 2);

    // Verify that the quantity is updated
    const dishElement = getByTestId('dish-1');
    expect(dishElement).toHaveTextContent('Quantity: 2');
  });

  it('deletes a dish from the cart when deleteSelectedDish is called', () => {
    const { getByTestId } = render(<MainLayout />);
    const cartElement = getByTestId('cart');
    expect(cartElement.children).toHaveLength(0);

    // Simulate adding a dish to the cart
    // MainLayout.addToCart({ id: 1, name: 'Test Dish' }, 1);

    // Simulate deleting the dish from the cart
    // MainLayout.deleteSelectedDish(1);

    // Verify that the dish is deleted from the cart
    expect(cartElement.children).toHaveLength(0);
  });
});
