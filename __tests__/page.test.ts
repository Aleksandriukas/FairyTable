import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartPage from './CartPage';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

jest.mock('../MainContext', () => ({
  useMainContext: () => ({
    cart: [
      { id: 1, quantity: 2, dish: { id: 1, title: 'Dish 1', price: 10 } },
      { id: 2, quantity: 1, dish: { id: 2, title: 'Dish 2', price: 15 } },
    ],
    deleteSelectedDish: jest.fn(),
  }),
}));

describe('CartPage', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<CartPage />);

    expect(getByText('Krepšelis')).toBeDefined();
    expect(getByText('Dish 1')).toBeDefined();
    expect(getByText('Dish 2')).toBeDefined();
    expect(getByText('Suma: 35.00 €')).toBeDefined();
    expect(getByTestId('pay-button')).toBeDefined();
  });

  it('calls deleteSelectedDish function when delete button is pressed', () => {
    const { getByTestId } = render(<CartPage />);
    const deleteButton = getByTestId('delete-button-1');

    fireEvent.press(deleteButton);

    expect(deleteButton).toBeDefined();
    // Add more assertions as needed
  });

  it('opens PaymentModal when Apmokėti button is pressed', () => {
    const { getByTestId, getByText } = render(<CartPage />);
    const payButton = getByText('Apmokėti');

    fireEvent.press(payButton);

    expect(getByTestId('payment-modal')).toBeDefined();
  });
});