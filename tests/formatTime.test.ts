import {Appointment, formatTime} from '../scripts/Model/Appointment';

test('it formats different time values', () => {
    expect(formatTime(0)).toBe('');
    expect(formatTime(60)).toBe('1m');
    expect(formatTime(61)).toBe('1m1s');
    expect(formatTime(78)).toBe('1m18s');
    expect(formatTime(1000)).toBe('16m40s');
    expect(formatTime(3600)).toBe('1h');
    expect(formatTime(3601)).toBe('1h1s');
});

test('it gets the duration of an appointment', () => {
    const appointment = new Appointment(
        'Test Appointment',
        new Date('2020-07-10 10:00:00'),
        new Date('2020-07-10 11:00:00'),
        'yellow'
    );

    expect(appointment.getDuration()).toBe('1h')
})

test('it correctly outputs the start time', () => {
    const appointment = new Appointment(
        'Test Appointment',
        new Date('2020-07-10 10:00:00'),
        new Date('2020-07-10 11:00:00'),
        'yellow'
    );

    expect(appointment.getStartTime()).toBe('10:00 AM');
})

test('it correctly outputs the end time', () => {
    const appointment = new Appointment(
        'Test Appointment',
        new Date('2020-07-10 10:00:00'),
        new Date('2020-07-10 11:00:00'),
        'yellow'
    );

    expect(appointment.getEndTime()).toBe('11:00 AM');
})

test('it correctly outputs the end time in 12 hour format', () => {
    const appointment = new Appointment(
        'Test Appointment',
        new Date('2020-07-10 10:00:00'),
        new Date('2020-07-10 21:00:00'),
        'yellow'
    );

    expect(appointment.getEndTime()).toBe('09:00 PM');
})
