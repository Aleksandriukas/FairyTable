import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { options } from './yourNavigationFile';

describe('Navigation stack', () => {
  it('creates a navigation stack with correct options', () => {
    const Stack = createStackNavigator();

    const { getByTestId } = render(
      <NavigationContainer>
        <Stack.Navigator screenOptions={options} />
      </NavigationContainer>
    );

    // Check if the stack navigator exists
    const stackNavigator = getByTestId('stack-navigator');
    expect(stackNavigator).toBeDefined();

    // You can also check specific options if needed
    expect(stackNavigator.props.screenOptions).toMatchObject(options.screenOptions);
  });
});
