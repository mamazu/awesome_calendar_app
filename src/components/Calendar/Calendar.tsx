import React from 'react';
import AppointmentData, { formatTime } from '../../objects/Model/AppointmentData';
import Appointment from '../Appointment/Appointment';
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

    getGap(appointments: AppointmentData[], index: number) {
        if (index === 0) { return }
        const endLast = appointments[index - 1].end
        const duration = appointments[index].start.getTime() - endLast.getTime()
        return <p className="gap">{formatTime(duration / 1000)}</p>
    }

    generateDayOfTheWeek(index: number, dayName: string, appointments: AppointmentData[]) {
        // The week for javascript starts on sunday
        const dayOfTheWeek = (index + 1) % 7;

        const appointmentsOnCurrentDay = appointments.filter(appointment => {
            const dayOfAppointment = appointment.start.getDay()
            return dayOfAppointment === dayOfTheWeek
        })

        const date = new Date(this.state.startOfTheWeek)
        date.setDate(date.getDate() + index)

        return <div className="day">
            <div className="day-of-week">{dayName} {date.getDate()}.{date.getMonth()}</div>

            {appointmentsOnCurrentDay.map((appoinment, index) => {
                return <div key={index}>
                    {this.getGap(appointmentsOnCurrentDay, index)}
                    <Appointment
                        key={index}
                        appointment={appoinment}
                        appointmentUpdateFunction={this.updateAppointment}
                    />
                </div>
            })}
        </div>
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
            <div className="Calendar" data-testid="Calendar">
                {this.generateDayOfTheWeek(0, 'Monday', this.state.appointments)}
                {this.generateDayOfTheWeek(1, 'Tuesday', this.state.appointments)}
                {this.generateDayOfTheWeek(2, 'Wednesday', this.state.appointments)}
                {this.generateDayOfTheWeek(3, 'Thursday', this.state.appointments)}
                {this.generateDayOfTheWeek(4, 'Friday', this.state.appointments)}
                {this.generateDayOfTheWeek(5, 'Saturday', this.state.appointments)}
                {this.generateDayOfTheWeek(6, 'Sunday', this.state.appointments)}
            </div>
        </div>
    }
}

export default Calendar;
