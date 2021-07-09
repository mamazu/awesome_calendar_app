import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Appointment from './Appointment';
import AppointmentData from '../../objects/Model/AppointmentData';

describe('<Appointment />', () => {
    test('it should mount', () => {
        const date = new Date();
        const appointmentData = new AppointmentData('test', date, date, 'yellow');

        let updateFunction = (a, b) => {};
        render(<Appointment appointment={appointmentData} appointmentUpdateFunction={updateFunction}/>);

        const appointment = screen.getByTestId('Appointment');

        expect(appointment).toBeInTheDocument();
    });
});
