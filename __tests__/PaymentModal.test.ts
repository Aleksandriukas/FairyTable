import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PaymentModal } from './PaymentModal';

// Mocking dependencies
jest.mock('../MainContext', () => ({
  useMainContext: () => ({
    cart: [
      { dish: { id: 1, title: 'Dish 1', price: 10 }, quantity: 2 },
      { dish: { id: 2, title: 'Dish 2', price: 15 }, quantity: 1 },
    ],
  }),
}));

jest.mock('../../../supabase/supabase', () => ({
  supabase: {
    from: () => ({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({ data: [{ id: 123 }] }),
    }),
  },
}));

jest.mock('../../../../charon', () => ({
  useLinkTo: () => jest.fn(),
}));

describe('PaymentModal', () => {
  it('renders correctly and triggers pay function', async () => {
    const onDismiss = jest.fn();
    const { getByText } = render(<PaymentModal total={35} onDismiss={onDismiss} />);

    // Check if components rendered correctly
    expect(getByText('Mokėjimas')).toBeDefined();
    expect(getByText('Dish 1')).toBeDefined();
    expect(getByText('Dish 2')).toBeDefined();
    expect(getByText('Suma: 35.00 €')).toBeDefined();

    // Trigger pay function
    fireEvent.press(getByText('Apmoketi'));

    // Wait for async operations to complete
    await waitFor(() => expect(onDismiss).toHaveBeenCalled());
    await waitFor(() => expect(supabase.from().insert().select).toHaveBeenCalled());
  });
});