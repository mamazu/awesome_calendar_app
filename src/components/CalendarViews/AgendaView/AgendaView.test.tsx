import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AgendaView from './AgendaView';
import AppointmentData from '../../../objects/Model/AppointmentData';

describe('<CompactView />', () => {
    test('it should mount', () => {
        const appointments: AppointmentData[] = []
        render(<AgendaView appointments={appointments} updateAppointment={() => { }} />);

        const compactView = screen.getByTestId('AgendaView');

        expect(compactView).toBeInTheDocument();
    });
    test('it renders two consecutive appointments without date between', () => {
        const appointments: AppointmentData[] = [
            new AppointmentData('Test1', new Date('2020-02-01 10:00'), new Date('2020-02-01 11:00'), ''),
            new AppointmentData('Test1', new Date('2020-02-01 16:00'), new Date('2020-02-01 17:00'), ''),
        ]
        render(<AgendaView appointments={appointments} updateAppointment={() => { }} />);

        const newDateRenders = screen.getAllByTestId('newDate');
        expect(newDateRenders.length).toBe(1);
    })
});