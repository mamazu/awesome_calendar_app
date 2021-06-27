import { Appointment, formatTime } from './Model/Appointment'

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
    ),
    new Appointment(
        new Date('2021-06-27 11:00'),
        new Date('2021-06-27 11:20'),
        'yellow',
        "Essen"
    ),
]

export function loadAppointments() {
    const dayElements = [...document.querySelectorAll('.day')]
    const appointmentsByDay: Appointment[][] = Array(7).map(() => [])
    for (let appointment of appointments) {
        const startWeekday = (appointment.start.getDay() + 6) % 7
        const dayElement = dayElements[startWeekday];
        let appointmentForCurrentDay = appointmentsByDay[startWeekday]
        if (appointmentForCurrentDay === undefined) {
            appointmentForCurrentDay = [];
            appointmentsByDay[startWeekday] = appointmentForCurrentDay;
        }

        if (appointmentForCurrentDay.length > 0) {
            const endLast = appointmentForCurrentDay[appointmentForCurrentDay.length - 1].end
            const duration = appointment.start.getTime() - endLast.getTime()
            dayElement.append(generateGap(duration))
        }
        dayElement.append(generateAppointmentHTML(appointment));

        appointmentForCurrentDay.push(appointment)
    }
}

function generateGap(duration: number): HTMLElement {
    const element = document.createElement('p');
    element.innerText = formatTime(duration)
    element.classList.add('gap')

    return element
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
