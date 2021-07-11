import React from 'react';
import AppointmentData, { formatTime } from '../../objects/Model/AppointmentData';
import './Appointment.css';

type AppointmentProps = {
    appointment: AppointmentData,
    appointmentUpdateFunction: (appointment: AppointmentData, newAppointmentData: AppointmentData) => void,
}

type AppointmentState = {
    inEditingMode: boolean
}

class Appointment extends React.Component<AppointmentProps, AppointmentState> {
    constructor(props: AppointmentProps) {
        super(props)
        this.state = {
            inEditingMode: false
        }
    }

    enableEditMode = (): void => {
        this.setState({ inEditingMode: true })
    }

    disableEditMode = (): void => this.setState({ inEditingMode: false })

    handleNameChange = (e: React.FormEvent) => {
        const nameElement = (e.target as HTMLInputElement);

        const currentAppointment = this.props.appointment
        const newObject = Object.assign({}, currentAppointment)
        newObject.name = nameElement.value
        this.props.appointmentUpdateFunction(currentAppointment, newObject);
    }

    handleEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            this.disableEditMode()
        }
    }

    public static formatDate(date: Date): string {
        return date.toLocaleDateString(AppointmentData.locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    }

    public static formatTime(date: Date): string {
        return date.toLocaleTimeString(AppointmentData.locale, { hour: '2-digit', minute: '2-digit' })
    }

    getDuration(appointment: AppointmentData): string {
        let durationInMilliSeconds = (appointment.end.getTime() - appointment.start.getTime())
        let durationInSeconds = durationInMilliSeconds / 1000
        return formatTime(durationInSeconds)
    }

    render() {
        const appointment = this.props.appointment
        const appointmentCssClasses = `Appointment label-${appointment.label}`

        let appointmentBody;
        if (this.state.inEditingMode) {
            appointmentBody = <input defaultValue={appointment.name}
                onChange={this.handleNameChange}
                onKeyDown={this.handleEnter}
                onBlur={this.disableEditMode}
                autoFocus
            />
        } else {
            appointmentBody = <div className="appointment-body">{appointment.name}</div>;
        }

        return <div className={appointmentCssClasses} data-testid="Appointment" onDoubleClick={this.enableEditMode}>
            <div className="appointment-header">
                <div className="start">{Appointment.formatTime(appointment.start)} &hellip; {Appointment.formatTime(appointment.end)}</div>
                <div className="duration">{this.getDuration(appointment)}</div>
            </div>
            {appointmentBody}
        </div>;
    }
}

export default Appointment;
