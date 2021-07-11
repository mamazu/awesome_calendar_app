import { Component } from 'react';
import AppointmentData from '../../../objects/Model/AppointmentData';
import Appointment from '../Appointment/Appointment';

type AgendaViewProps = {
    appointments: AppointmentData[],
    updateAppointment: (appointment: AppointmentData, newAppointmentData: AppointmentData) => void
}

class AgendaView extends Component<AgendaViewProps>{
    formatDateTime(date: Date): string {
        return `${Appointment.formatDate(date)} ${Appointment.formatTime(date)}`
    }

    render() {
        return <div className="AgendaView" data-testid="AgendaView">
            {this.props.appointments.map((appointment: AppointmentData, key: number) => {
                return <div key={key}>
                    <p>{Appointment.formatDate(appointment.start)}</p>
                    <Appointment appointment={appointment} appointmentUpdateFunction={this.props.updateAppointment} />
                </div>
            })}
        </div>
    }
}

export default AgendaView;
