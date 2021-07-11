import React from 'react';
import AppointmentData from '../../objects/Model/AppointmentData';
import CompactView from '../CompactView/CompactView';
import AppointmentCreate from '../AppointmentCreate/AppointmentCreate';
import './Calendar.css';

type CalendarProps = {
    appointments: AppointmentData[]
}
type CalendarState = {
    appointments: AppointmentData[]
    startOfTheWeek: Date
}

class Calendar extends React.Component<CalendarProps, CalendarState> {
    constructor(props: Readonly<CalendarProps> | CalendarProps) {
        super(props)

        const currentDate = new Date()
        this.state = {
            appointments: props.appointments,
            startOfTheWeek: new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1))
        }
    }

    addAppointment(appointment: AppointmentData): void {
        this.setState({
            appointments: [...this.state.appointments, appointment]
        })
    }

    updateAppointment = (appointment: AppointmentData, newAppointmentData: AppointmentData): void => {
        this.setState({
            appointments: this.state.appointments.map(
                (current): AppointmentData => {
                    if (appointment === current) {
                        return newAppointmentData
                    }

                    return current;
                }
            ),
        })
    }

    render() {
        return <div>
            <AppointmentCreate onSubmit={(appointment) => this.addAppointment(appointment)} />
            <CompactView
                appointments={this.state.appointments}
                updateAppointment={this.updateAppointment}
                startOfTheWeek={this.state.startOfTheWeek}
            />
        </div>
    }
}

export default Calendar;
