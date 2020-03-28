import React from 'react';


function MatchOdds({odds}){
    console.log("Odds", odds);
    if(odds == null){
        return(
            <div className="matchOdds">
                <p>Odds Unavailable</p>
            </div>
        );
    }else{
        return(
            <div className="matchOdds">
                
            </div>
        );
    }
    
}

export default MatchOdds;