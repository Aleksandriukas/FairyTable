import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { options } from './yourModule'; // Replace 'yourModule' with the correct path to your TypeScript module

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(),
}));

describe('Your Module', () => {
  it('exports a navigation stack with specified options', () => {
    // Define the expected navigation stack
    const expectedStack = jest.fn();

    // Mock the createNativeStackNavigator function to return the expected stack
    (createNativeStackNavigator as jest.Mock).mockReturnValue(expectedStack);

    // Import the module
    const stack = require('./yourModule').default;

    // Assert that the module exports the expected stack
    expect(stack).toBe(expectedStack);

    // Assert that the createNativeStackNavigator function was called with the correct options
    expect(createNativeStackNavigator).toHaveBeenCalledWith(options);
  });

  // Add more test cases to cover edge cases or additional functionality
});
