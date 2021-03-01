import React, { useState, useEffect } from 'react';


function MatchTime({date}){

    const [dateObject,setDateObject] = useState();
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (date){
            let d = new Date(date);
            let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            let newd = new Date(utc + (3600000*-5));
            setDateObject(new Date(newd));
        }
    }, [date]);

    useEffect(() => {
        if(dateObject){
            setMonth(new Intl.DateTimeFormat('en-US', { month: 'long'}).format(dateObject));
            setDay(dateObject.toDateString().slice(8,10));
            setTime(dateObject.toTimeString().slice(0,5));
        }
    }, [dateObject])

    return(
        // Credit: @craigbuckler
        <div className="matchTime">
                <time dateTime={dateObject} className="icon">
                    <em>{time}</em>
                    <strong>{month}</strong>
                    <span>{day}</span>
                </time>
        </div>
    );
}

export default MatchTime;