import { Component } from 'react';
import AppointmentData from '../../objects/Model/AppointmentData';
import CompactView from '../CalendarViews/CompactView/CompactView';
import AgendaView from '../CalendarViews/AgendaView/AgendaView';
import AppointmentCreate from '../AppointmentCreate/AppointmentCreate';
import './Calendar.css';

type CalendarProps = {
    appointments: AppointmentData[],
    currentView: ViewValue
}

export type ViewValue = 'compact' | 'agenda';
type CalendarState = {
    appointments: AppointmentData[]
    startOfTheWeek: Date
    currentView: ViewValue
}

class Calendar extends Component<CalendarProps, CalendarState> {
    constructor(props: Readonly<CalendarProps> | CalendarProps) {
        super(props)

        const currentDate = new Date()
        this.state = {
            appointments: props.appointments,
            startOfTheWeek: new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)),
            currentView: 'compact'
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

    renderView() {
        if (this.props.currentView === 'compact')
            return <CompactView
                appointments={this.state.appointments}
                updateAppointment={this.updateAppointment}
                startOfTheWeek={this.state.startOfTheWeek}
            />
        if (this.props.currentView === 'agenda') {
            return <AgendaView
                appointments={this.state.appointments}
                updateAppointment={this.updateAppointment}
            />
        }
    }

    render() {
        return <div>
            <AppointmentCreate onSubmit={(appointment) => this.addAppointment(appointment)} />
            {this.renderView()}
        </div>
    }
}

export default Calendar;
