import React, { FormEvent } from 'react';
import './AppointmentCreate.css';

// Importing flatpickr
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from 'react-flatpickr'
import flatpickr from "flatpickr";

class AppointmentCreate extends React.Component {
    handleSubmit(event: FormEvent) {
        event.preventDefault()

        const target = event.target as typeof event.target & {
            name: { "value": string }
        }

        console.log(target.name.value)
    }

    render() {
        const options: flatpickr.Options.Options = { enableTime: true, time_24hr: true }

        return <form onSubmit={this.handleSubmit}>
            <input name="name" type="text" />
            <Flatpickr data-enable-time options={options} />
            <Flatpickr data-enable-time options={options} />

            <button type="submit">Submit</button>
        </form>
    }
}

export default AppointmentCreate;
