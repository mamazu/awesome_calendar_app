class Appointment {

    constructor(
        public start: Date,
        public end: Date,
        public label: string,
        public name: string,
    ) {
    }

    getDuration(): string {
        let durationInSeconds = (this.end.getTime() - this.start.getTime()) / 1000;

        let returnString = '';
        if (durationInSeconds > 3600) {
            const hours = Math.floor(durationInSeconds / 3600);
            returnString += hours + 'h'
            durationInSeconds -= hours * 60*60;
        }

        if (durationInSeconds > 60) {
            const minutes = Math.floor(durationInSeconds / 60);
            returnString += minutes + 'm'
            durationInSeconds -= minutes * 60;
        }

        if (durationInSeconds !== 0) {
            returnString += durationInSeconds + 's';
        }

        return returnString
    }

    getStart(): string {
        return this.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); ;
    }

    getEnd(): string {
        return this.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); ;
    }
}

let s: string = 'Hello';

const appointments: Appointment[] = [
    new Appointment(
        new Date('2021-06-24 15:00:00'),
        new Date('2021-06-24 16:20:00'),
        'red',
        'Testen'
    ),
    new Appointment(
        new Date('2021-06-25 15:00:00'),
        new Date('2021-06-25 16:00:00'),
        'gray',
        'Testen'
    ),
    new Appointment(
        new Date('2021-06-27 10:00'),
        new Date('2021-06-27 10:20'),
        'yellow',
        "Essen"
    )
]

function loadAppointments() {
    const dayElements = [...document.querySelectorAll('.day-of-week')]
    for(let appointment of appointments) {
        const startWeekday = (appointment.start.getDay() + 6) % 7

        dayElements[startWeekday].parentElement?.append(generateAppointmentHTML(appointment))
    }
}

function generateAppointmentHTML(appointment: Appointment): HTMLElement {
    const template = document.querySelector('#appointment-template') as any
    const element = template.content.cloneNode(true);

    element.querySelector('.start').innerText = appointment.getStart() + '...' + appointment.getEnd();
    element.querySelector('.duration').innerText = appointment.getDuration()
    element.querySelector('.appointment').classList.add(`label-${appointment.label}`)
    element.querySelector('.appointment-body').innerText = appointment.name
    return element
}
