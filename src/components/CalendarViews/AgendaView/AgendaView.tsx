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
        let lastAppointmentStartDate: string;
        return <div className="AgendaView" data-testid="AgendaView">
            {this.props.appointments.map((appointment: AppointmentData, key: number) => {
                let shouldRenderDate = false
                const currentStartDate = Appointment.formatDate(appointment.start)
                if (lastAppointmentStartDate !== currentStartDate) {
                    lastAppointmentStartDate = currentStartDate;
                    shouldRenderDate = true;
                }

                return <div key={key}>
                    {shouldRenderDate && <p>{currentStartDate}</p>}
                    <Appointment appointment={appointment} appointmentUpdateFunction={this.props.updateAppointment} />
                </div>
            })}
        </div>
    }
}

export default AgendaView;
