import React from 'react';


function MatchTime(){
    return(
        <div className="matchTime">
                <h1>{matchData.strDate}</h1>
                <p>{matchData.strTime}</p>
        </div>
    );
}

export default MatchTime;