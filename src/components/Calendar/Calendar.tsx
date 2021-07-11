import React, { FormEvent } from 'react';
import AppointmentData from '../../objects/Model/AppointmentData';
import CompactView from '../CompactView/CompactView';
import AgendaView from '../AgendaView/AgendaView';
import AppointmentCreate from '../AppointmentCreate/AppointmentCreate';
import './Calendar.css';

type CalendarProps = {
    appointments: AppointmentData[]
}

type ViewValue = 'compact' | 'agenda';
type CalendarState = {
    appointments: AppointmentData[]
    startOfTheWeek: Date
    currentView: ViewValue
}

class Calendar extends React.Component<CalendarProps, CalendarState> {
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

    updateViewState = (event: FormEvent): void => {
        const value = (event.target as HTMLSelectElement).value as ViewValue

        this.setState({
            currentView: value
        })
    }

    getView() {
        if (this.state.currentView === 'compact')
            return <CompactView
                appointments={this.state.appointments}
                updateAppointment={this.updateAppointment}
                startOfTheWeek={this.state.startOfTheWeek}
            />
        if (this.state.currentView === 'agenda') {
            return <AgendaView
                appointments={this.state.appointments}
                updateAppointment={this.updateAppointment}
            />
        }
    }

    render() {
        return <div>
            <AppointmentCreate onSubmit={(appointment) => this.addAppointment(appointment)} />
            <select onChange={this.updateViewState} defaultValue={this.state.currentView}>
                <option value="agenda">Agenda</option>
                <option value="compact">Compact</option>
            </select>
            {this.getView()}
        </div>
    }
}

export default Calendar;
