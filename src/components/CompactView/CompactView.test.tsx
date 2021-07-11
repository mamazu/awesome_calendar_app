import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CompactView from './CompactView';
import AppointmentData from '../../objects/Model/AppointmentData';

describe('<CompactView />', () => {
    test('it should mount', () => {
        const appointments: AppointmentData[] = []
        render(<CompactView appointments={appointments} updateAppointment={() => {}} startOfTheWeek={new Date()} />);

        const compactView = screen.getByTestId('CompactView');

        expect(compactView).toBeInTheDocument();
    });
});