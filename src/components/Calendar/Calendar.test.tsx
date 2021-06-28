import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Calendar from './Calendar';

describe('<Appointment />', () => {
  test('it should mount', () => {
    render(<Calendar appointments={[]} />);
    
    const calendar = screen.getByTestId('Calendar');

    expect(calendar).toBeInTheDocument();
  });
});