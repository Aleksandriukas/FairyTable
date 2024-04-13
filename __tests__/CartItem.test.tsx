import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CartItem, CartItemProps } from './CartItem';

const mockData: DishBean = {
  title: 'Test Dish',
  photoURL: 'https://example.com/image.jpg',
  price: 10.99,
};

const mockCartItemProps: CartItemProps = {
  data: mockData,
  cartItemId: 1,
  quantity: 2,
  onDelete: jest.fn(),
};

describe('CartItem', () => {
  it('renders correctly with provided data and quantity', () => {
    const { getByText, getByTestId } = render(<CartItem {...mockCartItemProps} />);

    expect(getByText('Test Dish')).toBeDefined();
    expect(getByText('10.99 €')).toBeDefined();
    expect(getByText('2')).toBeDefined();
    expect(getByTestId('quantity-picker')).toBeDefined();
    expect(getByTestId('delete-button')).toBeDefined();
  });

  it('calls onDelete function when delete button is pressed', () => {
    const { getByTestId } = render(<CartItem {...mockCartItemProps} />);
    fireEvent.press(getByTestId('delete-button'));
    expect(mockCartItemProps.onDelete).toHaveBeenCalled();
  });

  it('updates quantity when QuantityPicker changes', () => {
    const { getByTestId } = render(<CartItem {...mockCartItemProps} />);
    fireEvent.changeText(getByTestId('quantity-picker'), '3');
    expect(mockCartItemProps.updateCart).toHaveBeenCalledWith(1, 3);
  });
});