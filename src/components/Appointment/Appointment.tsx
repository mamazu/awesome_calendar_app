import React from 'react';
import AppointmentData from '../../objects/Model/AppointmentData';
import './Appointment.css';

type AppointmentProps = {
    appointment: AppointmentData
}
class Appointment extends React.Component<AppointmentProps, {}> {
    render() {
        const appointment = this.props.appointment
        const appointmentCssClasses = `Appointment label-${appointment.label}`
        return <div className={appointmentCssClasses} data-testid="Appointment">
            <div className="appointment-header">
                <div className="start">{appointment.getStartTime()} &hellip; {appointment.getEndTime()}</div>
                <div className="duration">{appointment.getDuration()}</div>
            </div>
            <div className="appointment-body">{appointment.name}</div>
        </div>
    }
}

export default Appointment;
