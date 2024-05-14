import { Given, When, Then } from '@cucumber/cucumber';
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { QuantityPicker } from '../src/components/QuantityPicker/QuantityPicker.js';

let component: React.ReactElement;
let quantity: number;
let setQuantity: jest.Mock;

Given('I have a QuantityPicker component with quantity set to {int}', (initialQuantity: number) => {
  quantity = initialQuantity;
  setQuantity = jest.fn();
  component = <QuantityPicker quantity={quantity} setQuantity={setQuantity} />;
});

When('I tap the plus button', () => {
  const { getByTestId } = render(component);
  const plusButton = getByTestId('plus-btn');
  fireEvent.press(plusButton);
});

When('I tap the minus button', () => {
  const { getByTestId } = render(component);
  const minusButton = getByTestId('minus-btn');
  fireEvent.press(minusButton);
});

Then('the quantity should increase to {int}', (expectedQuantity: number) => {
  expect(setQuantity).toHaveBeenCalledWith(expectedQuantity);
});

Then('the quantity should decrease to {int}', (expectedQuantity: number) => {
  expect(setQuantity).toHaveBeenCalledWith(expectedQuantity);
});

Then('the quantity should remain at {int}', (expectedQuantity: number) => {
  expect(setQuantity).not.toHaveBeenCalled();
});
