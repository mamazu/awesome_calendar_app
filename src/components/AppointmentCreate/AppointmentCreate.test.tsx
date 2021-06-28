import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppointmentCreate from './AppointmentCreate';
import AppointmentData from '../../objects/Model/AppointmentData';

describe('<Appointment />', () => {
    test('it should mount', () => {
        render(<AppointmentCreate onSubmit={(appointment: AppointmentData) => {return;}} />);

        const appointment = screen.getByTestId('Appointment');

        expect(appointment).toBeInTheDocument();
    });
});