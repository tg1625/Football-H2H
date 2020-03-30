import React, { useState, useEffect } from 'react';


function MatchTime({d,t}){

    const [dateObject,setDateObject] = useState();
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    useEffect(() => {
        if (d){
            setDateObject(new Date(d));
        }
    }, [d]);

    useEffect(() => {
        if(dateObject){
            setMonth(new Intl.DateTimeFormat('en-US', { month: 'long'}).format(dateObject));
            setDay(dateObject.toDateString().slice(8,10));
        }
    }, [dateObject])

    return(
        // Credit: @craigbuckler
        <div className="matchTime">
                <time dateTime={dateObject} className="icon">
                    <em>{t.slice(0,5)}</em>
                    <strong>{month}</strong>
                    <span>{day}</span>
                </time>
        </div>
    );
}

export default MatchTime;