export function formatTime(durationInSeconds: number): string {
    let returnString = '';
    if (durationInSeconds >= 3600) {
        const hours = Math.floor(durationInSeconds / 3600);
        returnString += hours + 'h'
        durationInSeconds -= hours * 60 * 60;
    }

    if (durationInSeconds >= 60) {
        const minutes = Math.floor(durationInSeconds / 60);
        returnString += minutes + 'm'
        durationInSeconds -= minutes * 60;
    }

    if (durationInSeconds !== 0) {
        returnString += durationInSeconds + 's';
    }

    return returnString
}

export default class AppointmentData {
    static locale = 'de-DE';

    constructor(
        public name: string,
        public start: Date,
        public end: Date,
        public label: string,
    ) { }

}
