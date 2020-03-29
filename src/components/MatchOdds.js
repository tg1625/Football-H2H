import React from 'react';


function MatchOdds({odds}){
    console.log("Odds", odds);
    //if(odds == null || odds.sites_count == 0){//no odds available, comment for sample odds 
    if(odds === 'null'){ //uncomment for sample odds 
        return(
            <div className="matchOdds">
                <h3>Odds Unavailable</h3>
            </div>
        );
    }else{
        // let homeOdds = odds.sites[0].odds.h2h[0]; //just using the first oods site 
        // let awayOdds = odds.sites[0].odds.h2h[1];
        let homeOdds = 1.79; //using premade odds to show UI changes 
        let awayOdds = 2.15;
        
        //setting text color based on odds 
        let homeTextColor, awayTextColor;
        if (homeOdds < awayOdds){
            homeTextColor = "#DB4D0B";
            awayTextColor = "#62B009";
        }else if(homeOdds === awayOdds){
            homeTextColor = "#E6B000";
            awayTextColor = "#E6B000";
        }else{
            awayTextColor = "#DB4D0B";
            homeTextColor = "#62B009";
        }

        return(
            <div className="matchOdds">
                <div className="team" style={{color:homeTextColor}}>{homeOdds}</div>
                <h3 className="vs">&nbsp;</h3>
                <div className="team" style={{color:awayTextColor}}>{awayOdds}</div>
            </div>
        );
    }
    
}

export default MatchOdds;