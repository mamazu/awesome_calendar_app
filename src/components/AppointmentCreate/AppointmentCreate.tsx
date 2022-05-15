import React, { FormEvent } from 'react';
import './AppointmentCreate.css';
import AppointmentData from '../../objects/Model/AppointmentData';
import PopUp from '../Popup/Popup';

// Importing flatpickr
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from 'react-flatpickr'
import flatpickr from "flatpickr";

type AppointmentCreateProps = {
    onSubmit: (appointment: AppointmentData) => void;
}

type AppointmentCreateState = {
    name: string,
    popupOpen: boolean,
    start?: Date,
    end?: Date
}

class AppointmentCreate extends React.Component<AppointmentCreateProps, AppointmentCreateState> {
    constructor(props: Readonly<AppointmentCreateProps> | AppointmentCreateProps) {
        super(props)
        this.state = {
            name: "",
            popupOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.changeName = this.changeName.bind(this)
        this.changeStart = this.changeStart.bind(this)
        this.changeEnd = this.changeEnd.bind(this)
    }

    changeName(event: FormEvent): void {
        this.setState({
            name: (event.target as HTMLInputElement).value
        })
    }

    changeStart(dates: Date[], currentDateString: string): void {
        if (dates.length === 0) {
            return;
        }

        this.setState({ start: dates[0] })
    }

    changeEnd(dates: Date[], currentDateString: string): void {
        if (dates.length === 0) {
            return;
        }

        this.setState({ end: dates[0] })
    }

    handleSubmit(event: FormEvent): void {
        event.preventDefault()

        if (this.state.start === undefined || this.state.end === undefined) {
            console.log('State invalid')
            return;
        }

        const appointment = new AppointmentData(
            this.state.name,
            this.state.start,
            this.state.end,
            'yellow'
        )
        this.props.onSubmit(appointment)
        this.togglePopUp()
    }

    togglePopUp() {
        this.setState({
            ...this.state,
            popupOpen: !this.state.popupOpen
        })
    }

    render() {
        const options: flatpickr.Options.Options = { enableTime: true, time_24hr: true }

        return <>
            <button onClick={this.togglePopUp.bind(this)}>Create</button>

            <PopUp shown={this.state.popupOpen} togglePopup={this.togglePopUp.bind(this)}>
                <form onSubmit={this.handleSubmit} data-testid="AppointmentCreate">
                    <label>
                    Name:
                    <input name="name" type="text" value={this.state.name} onChange={this.changeName} required />
                    </label>
                    <label>
                    Begin:
                    <Flatpickr data-enable-time options={options} onChange={this.changeStart} required />
                    </label>
                    <label>
                    End:
                    <Flatpickr data-enable-time options={options} onChange={this.changeEnd} required />
                    </label>

                    <button type="submit">Submit</button>
                    </form>
            </PopUp>
        </>
    }
}

export default AppointmentCreate;
