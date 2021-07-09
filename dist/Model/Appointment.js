export function formatTime(durationInSeconds) {
    let returnString = '';
    if (durationInSeconds >= 3600) {
        const hours = Math.floor(durationInSeconds / 3600);
        returnString += hours + 'h';
        durationInSeconds -= hours * 60 * 60;
    }
    if (durationInSeconds >= 60) {
        const minutes = Math.floor(durationInSeconds / 60);
        returnString += minutes + 'm';
        durationInSeconds -= minutes * 60;
    }
    if (durationInSeconds !== 0) {
        returnString += durationInSeconds + 's';
    }
    return returnString;
}
export class Appointment {
    constructor(name, start, end, label) {
        this.name = name;
        this.start = start;
        this.end = end;
        this.label = label;
    }
    getDuration() {
        let durationInMilliSeconds = (this.end.getTime() - this.start.getTime());
        let durationInSeconds = durationInMilliSeconds / 1000;
        return formatTime(durationInSeconds);
    }
    getStartTime() {
        return this.start.toLocaleTimeString(Appointment.locale, { hour: '2-digit', minute: '2-digit' });
        ;
    }
    getEndTime() {
        return this.end.toLocaleTimeString(Appointment.locale, { hour: '2-digit', minute: '2-digit' });
        ;
    }
}
Appointment.locale = 'de-DE';
//# sourceMappingURL=Appointment.js.map