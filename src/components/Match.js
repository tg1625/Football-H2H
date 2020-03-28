import React from 'react';
import MatchOdds from './MatchOdds.js';

function Match({matchData,allOdds}){

    console.log("Match is", matchData);

    let oddsData; 

    if(allOdds){
        for(var i = 0; i < allOdds.length; i++){
            if(allOdds[i].home_team === matchData.strHomeTeam){
                oddsData = allOdds[i];
                break;
            }
        }
    }

    return(
        <div className="match">
            <div className="matchTime">
                <p>{matchData.strDate}</p>
                <p>{matchData.strTime}</p>
            </div>
            <div className="matchData">
                <div className="matchHeading">
                    <p>{matchData.strEvent}</p>
                </div>
                <div className="matchOdds">
                    <MatchOdds odds={oddsData}/>
                </div>
            </div>
        </div>
    );
}

export default Match;