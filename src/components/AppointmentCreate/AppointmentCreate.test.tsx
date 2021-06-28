import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppointmentCreate from './AppointmentCreate';

describe('<Appointment />', () => {
    test('it should mount', () => {
        render(<AppointmentCreate />);

        const appointment = screen.getByTestId('Appointment');

        expect(appointment).toBeInTheDocument();
    });
});