import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Popup from './Popup';

describe('<Popup />', () => {
  test('it should mount', () => {
    render(<Popup />);

    const popup = screen.getByTestId('Popup');

    expect(popup).toBeInTheDocument();
  });
});
