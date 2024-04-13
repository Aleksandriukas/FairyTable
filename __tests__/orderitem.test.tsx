import React from 'react';
import { render } from '@testing-library/react-native';
import OrderItem, { OrderDish } from './OrderItem';

const mockData: OrderDish['data'] = {
  title: 'Test Dish',
  photoURL: 'https://example.com/image.jpg',
  price: 10.99,
};

describe('OrderItem', () => {
  it('renders correctly with provided data and quantity', () => {
    const { getByText, getByTestId } = render(<OrderItem data={mockData} quantity={2} />);

    expect(getByText('Test Dish')).toBeDefined();
    expect(getByText('Kiekis: 2')).toBeDefined();
    expect(getByText('10.99 €')).toBeDefined();
    expect(getByTestId('order-item-image')).toHaveProp('source', { uri: 'https://example.com/image.jpg' });
  });

  it('renders correctly with long title', () => {
    const longTitleData: OrderDish['data'] = { ...mockData, title: 'Very Long Test Dish Title' };
    const { getByText } = render(<OrderItem data={longTitleData} quantity={1} />);

    expect(getByText('Very Long Test Dish Title')).toBeDefined();
  });
});