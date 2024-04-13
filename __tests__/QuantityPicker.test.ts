import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { QuantityPicker, QuantityPickerProps } from './QuantityPicker';

describe('QuantityPicker', () => {
  const mockSetQuantity = jest.fn();

  const quantityPickerProps: QuantityPickerProps = {
    quantity: 5,
    setQuantity: mockSetQuantity,
  };

  it('renders the correct quantity', () => {
    render(<QuantityPicker {...quantityPickerProps} />);
    expect(screen.getByText('5')).toBeTruthy();
  });

  it('decrements the quantity when minus button is pressed', () => {
    render(<QuantityPicker {...quantityPickerProps} />);
    fireEvent.press(screen.getByTestId('minusButton'));
    expect(mockSetQuantity).toHaveBeenCalledWith(4);
  });

  it('does not decrement the quantity if it is already 1', () => {
    render(<QuantityPicker quantity={1} setQuantity={mockSetQuantity} />);
    fireEvent.press(screen.getByTestId('minusButton'));
    expect(mockSetQuantity).not.toHaveBeenCalled();
  });

  it('increments the quantity when plus button is pressed', () => {
    render(<QuantityPicker {...quantityPickerProps} />);
    fireEvent.press(screen.getByTestId('plusButton'));
    expect(mockSetQuantity).toHaveBeenCalledWith(6);
  });

  it('does not increment the quantity if it is already 99', () => {
    render(<QuantityPicker quantity={99} setQuantity={mockSetQuantity} />);
    fireEvent.press(screen.getByTestId('plusButton'));
    expect(mockSetQuantity).not.toHaveBeenCalled();
  });

  // Add more test cases to cover other scenarios, such as edge cases or UI interactions.
});
