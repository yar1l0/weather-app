import { render, screen } from '@testing-library/react';
import ErrorMessage from '../../app/components/ErrorMessage';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

describe('ErrorMessage', () => {
  it('should render the error message correctly', () => {
    const errorMessage = 'City not found. Please check the city name and try again.';
    
    render(<ErrorMessage message={errorMessage} />);
    
    // Check if the error message is displayed
    expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
    
    // Check if the error title is present
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});