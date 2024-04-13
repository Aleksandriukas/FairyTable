import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuthPage from './AuthPage';
import { supabase } from '../../supabase/supabase';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

jest.mock('../../../charon', () => ({
  useLinkTo: jest.fn(),
}));

jest.mock('../../supabase/supabase', () => ({
  auth: {
    signInWithPassword: jest.fn(),
  },
}));

describe('AuthPage', () => {
  it('renders correctly', () => {
    const { getByLabelText, getByText } = render(<AuthPage />);

    expect(getByLabelText('Paštas')).toBeDefined();
    expect(getByLabelText('Slaptažodis')).toBeDefined();
    expect(getByText('Prisijungti')).toBeDefined();
  });

  it('calls signIn function with email and password when Prisijungti button is pressed', () => {
    const { getByLabelText, getByText } = render(<AuthPage />);
    const emailInput = getByLabelText('Paštas');
    const passwordInput = getByLabelText('Slaptažodis');
    const loginButton = getByText('Prisijungti');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(loginButton);

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });
});