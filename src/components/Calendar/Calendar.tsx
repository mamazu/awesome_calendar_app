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
}

class Calendar extends React.Component<CalendarProps, CalendarState> {
    constructor(props: Readonly<CalendarProps> | CalendarProps) {
        super(props)
        this.state = {
            appointments: props.appointments
        }
    }
    getGap(appointments: AppointmentData[], index: number) {
        if (index === 0) { return }
        const endLast = appointments[index - 1].end
        const duration = appointments[index].start.getTime() - endLast.getTime()
        return <p className="gap">{formatTime(duration / 1000)}</p>
    }

    generateDayOfTheWeek(dayOfTheWeek: number, dayName: string, appointments: AppointmentData[]) {
        const appointmentsOnCurrentDay = appointments.filter(appointment => {
            const dayOfAppointment = appointment.start.getDay()
            return dayOfAppointment === dayOfTheWeek
        })

        return <div className="day">
            <div className="day-of-week">{dayName}</div>

            {appointmentsOnCurrentDay.map((appoinment, index) => {
                return <div key={index}>
                    {this.getGap(appointmentsOnCurrentDay, index)}
                    <Appointment key={index} appointment={appoinment} />
                </div>
            })}
        </div>
    }

    addAppointment(appointment: AppointmentData): void {
        this.setState({
            appointments: [...this.state.appointments, appointment]
        })
    }

    render() {
        return <div>
            <AppointmentCreate onSubmit={(appointment) => this.addAppointment(appointment)} />
            <div className="Calendar" data-testid="Calendar">
                {this.generateDayOfTheWeek(1, 'Monday', this.state.appointments)}
                {this.generateDayOfTheWeek(2, 'Tuesday', this.state.appointments)}
                {this.generateDayOfTheWeek(3, 'Wednesday', this.state.appointments)}
                {this.generateDayOfTheWeek(4, 'Thursday', this.state.appointments)}
                {this.generateDayOfTheWeek(5, 'Friday', this.state.appointments)}
                {this.generateDayOfTheWeek(6, 'Saturday', this.state.appointments)}
                {this.generateDayOfTheWeek(0, 'Sunday', this.state.appointments)}
            </div>
        </div>
    }
}

export default Calendar;
