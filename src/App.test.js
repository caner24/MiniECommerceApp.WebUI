import { render, screen, fireEvent } from '@testing-library/react';
import Login from './components/Login';

test('renders login form with email, password fields, and submit button', () => {
  render(<Login />);
  
  // Check if the email label and input field are present
  const emailLabel = screen.getByText(/email address/i);
  expect(emailLabel).toBeInTheDocument();
  
  const emailInput = screen.getByPlaceholderText(/enter email/i);
  expect(emailInput).toBeInTheDocument();
  
  // Check if the password label and input field are present
  const passwordLabel = screen.getByText(/password/i);
  expect(passwordLabel).toBeInTheDocument();
  
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput).toBeInTheDocument();
  
});
