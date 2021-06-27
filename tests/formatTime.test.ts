const appointment = require('../scripts/Model/Appointment');

test('formatTime', () => {
    expect(appointment.formatTime(0)).toBe('');
    expect(appointment.formatTime(60)).toBe('60s');
    expect(appointment.formatTime(61)).toBe('1m1s');
    expect(appointment.formatTime(78)).toBe('1m18s');
    expect(appointment.formatTime(1000)).toBe('16m40s');
    expect(appointment.formatTime(3600)).toBe('60m');
    expect(appointment.formatTime(3601)).toBe('1h1s');
});
