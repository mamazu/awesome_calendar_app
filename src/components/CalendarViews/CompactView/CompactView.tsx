import { Component } from 'react';
import AppointmentData, { formatTime } from '../../../objects/Model/AppointmentData';
import Appointment from '../Appointment/Appointment';

type CompactViewProps = {
    appointments: AppointmentData[],
    startOfTheWeek: Date,
    updateAppointment: (appointment: AppointmentData, newAppointmentData: AppointmentData) => void
}

class CompactView extends Component<CompactViewProps>{
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

        const date = new Date(this.props.startOfTheWeek)
        date.setDate(date.getDate() + index)

        return <div className="day">
            <div className="day-of-week">{dayName} {date.getDate()}.{date.getMonth()}</div>

            {appointmentsOnCurrentDay.map((appoinment, index) => {
                return <div key={index}>
                    {this.getGap(appointmentsOnCurrentDay, index)}
                    <Appointment
                        key={index}
                        appointment={appoinment}
                        appointmentUpdateFunction={this.props.updateAppointment}
                    />
                </div>
            })}
        </div>
    }
    render() {
        return <div className="CompactView" data-testid="CompactView">
            <div className="Calendar" data-testid="Calendar">
                {this.generateDayOfTheWeek(0, 'Monday', this.props.appointments)}
                {this.generateDayOfTheWeek(1, 'Tuesday', this.props.appointments)}
                {this.generateDayOfTheWeek(2, 'Wednesday', this.props.appointments)}
                {this.generateDayOfTheWeek(3, 'Thursday', this.props.appointments)}
                {this.generateDayOfTheWeek(4, 'Friday', this.props.appointments)}
                {this.generateDayOfTheWeek(5, 'Saturday', this.props.appointments)}
                {this.generateDayOfTheWeek(6, 'Sunday', this.props.appointments)}
            </div>
        </div>
    }
}

export default CompactView;
