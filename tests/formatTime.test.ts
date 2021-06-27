const appointment = require('../scripts/Model/Appointment');

test('formatTime', () => {
    expect(appointment.formatTime(0)).toBe('');
    expect(appointment.formatTime(1)).toBe('0.001s');
    expect(appointment.formatTime(60 * 1000)).toBe('60s');
    expect(appointment.formatTime(61 * 1000)).toBe('1m1s');
    expect(appointment.formatTime(78 * 1000)).toBe('1m18s');
    expect(appointment.formatTime(1000 * 1000)).toBe('16m40s');
    expect(appointment.formatTime(3600 * 1000)).toBe('60m');
    expect(appointment.formatTime(3601 * 1000)).toBe('1h1s');
});
