import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DishListItem, DishListItemProps } from '../src/app/(main)/DishListItem';

describe('DishListItem', () => {
  const mockDish: DishListItemProps = {
    data: {
      id: 1,
      title: 'Test Dish',
      description: 'Test description',
      photoURL: 'https://example.com/test.jpg',
      price: 10.99,
    },
  };

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<DishListItem {...mockDish} />);

    // Check if the dish title, description, and price are rendered
    expect(getByText('Test Dish')).toBeTruthy();
    expect(getByText('Test description')).toBeTruthy();
    expect(getByText('10.99 €')).toBeTruthy();

    // Check if the touchable element is rendered
    expect(getByTestId('touchable-ripple')).toBeTruthy();
  });

  it('navigates to the correct screen on press', () => {
    const { getByTestId } = render(<DishListItem {...mockDish} />);
    const touchableElement = getByTestId('touchable-ripple');

    fireEvent.press(touchableElement);

    // You can assert that the navigation action has been called
    // For example, you can mock the useLinkTo hook and assert that it has been called with the correct URL
  });
});