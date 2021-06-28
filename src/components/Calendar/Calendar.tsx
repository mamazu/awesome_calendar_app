import React from 'react';
import AppointmentData, { formatTime } from '../../objects/Model/AppointmentData';
import Appointment from '../Appointment/Appointment';
import AppointmentCreate from '../AppointmentCreate/AppointmentCreate';
import './Calendar.css';

type CalendarProps = {
    appointments: AppointmentData[]
}
class Calendar extends React.Component<CalendarProps, {}> {
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

    render() {
        return <div>
            <AppointmentCreate />
            <div className="Calendar" data-testid="Calendar">
                {this.generateDayOfTheWeek(1, 'Monday', this.props.appointments)}
                {this.generateDayOfTheWeek(2, 'Tuesday', this.props.appointments)}
                {this.generateDayOfTheWeek(3, 'Wednesday', this.props.appointments)}
                {this.generateDayOfTheWeek(4, 'Thursday', this.props.appointments)}
                {this.generateDayOfTheWeek(5, 'Friday', this.props.appointments)}
                {this.generateDayOfTheWeek(6, 'Saturday', this.props.appointments)}
                {this.generateDayOfTheWeek(0, 'Sunday', this.props.appointments)}
            </div>
        </div>
    }
}

export default Calendar;
