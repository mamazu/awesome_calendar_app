export function formatTime(durationInMilliSeconds: number): string {
    let durationInSeconds = durationInMilliSeconds / 1000

    let returnString = '';
    if (durationInSeconds > 3600) {
        const hours = Math.floor(durationInSeconds / 3600);
        returnString += hours + 'h'
        durationInSeconds -= hours * 60 * 60;
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

const locale = 'de-DE'

export class Appointment {

    constructor(
        public start: Date,
        public end: Date,
        public label: string,
        public name: string,
    ) {
    }

    getDuration(): string {
        let durationInMilliSeconds = (this.end.getTime() - this.start.getTime());

        return formatTime(durationInMilliSeconds)
    }

    getStart(): string {
        return this.start.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });;
    }

    getEnd(): string {
        return this.end.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });;
    }
}
