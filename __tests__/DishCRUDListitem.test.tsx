import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { DishCRUDListItem, DishListItemProps } from '../src/app/auth/admin/DishCRUDListItem';

describe('DishCRUDListItem', () => {
  const dishData: DishListItemProps = {
    data: {
      id: 1,
      title: 'Test Dish',
      description: 'Test Description',
      price: 10,
      photoURL: 'test-url',
    },
  };

  it('renders correctly with provided data', () => {
    render(<DishCRUDListItem {...dishData} />);

    expect(screen.getByText('Test Dish')).toBeTruthy();
    expect(screen.getByText('Test Description')).toBeTruthy();
    expect(screen.getByText('10 €')).toBeTruthy();
  });

  // Add more test cases to cover other scenarios, such as loading state, error handling, etc.
});
