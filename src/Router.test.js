import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';

test('renders home page content', () => {
  render(<Home />);
  
  // Check if the Home page title is rendered
  const pageTitle = screen.getByText(/Data to enrich your online business/i);
  expect(pageTitle).toBeInTheDocument();

});
