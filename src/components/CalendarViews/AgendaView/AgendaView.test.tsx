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
});