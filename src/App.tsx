import React, { useState } from 'react';
import Calendar, {ViewValue} from './components/Calendar/Calendar';
import './App.css';
import AppointmentData from './objects/Model/AppointmentData';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
    const appointments = [
        new AppointmentData(
            'Testen',
            new Date('2021-06-24 15:00:00'),
            new Date('2021-06-24 16:20:00'),
            'red',
        ),
        new AppointmentData(
            'Testen',
            new Date('2021-06-25 15:00:00'),
            new Date('2021-06-25 16:00:00'),
            'gray',
        ),
        new AppointmentData(
            "Essen",
            new Date('2021-06-27 10:00'),
            new Date('2021-06-27 10:20'),
            'yellow',
        ),
        new AppointmentData(
            "Essen",
            new Date('2021-06-27 11:00'),
            new Date('2021-06-27 11:20'),
            'yellow',
        ),
    ];

    const [currentView, updateViewState] = useState<ViewValue>('compact');

    return (
        <div className="App" data-testid="App">
            <Sidebar updateViewState={updateViewState} currentView={currentView} />
            <Calendar appointments={appointments} currentView={currentView} />
        </div>
    );
}

export default App;
