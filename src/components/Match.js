import React, {useEffect, useState} from "react";
import axios from 'axios';
import MatchOdds from './MatchOdds.js';

function Match({matchData,allOdds}){
    //find odds for this match 
    let odds; 
    if(allOdds){
        for(var i = 0; i < allOdds.length; i++){
            if(allOdds[i].home_team === matchData.strHomeTeam){
                odds = allOdds[i];
                break;
            }
        }
    }

    /*--- Getting images for each team --- */
    const [homeData, setHomeData] = useState({});
    const [awayData, setAwayData] = useState({});
    const [homeImg, setHomeImg] = useState('');
    const [awayImg, setAwayImg] = useState('');
    //get data for each team
    useEffect(() =>{   
        if(matchData){
            //get home team data
            axios.get(
                `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${matchData.idHomeTeam}`
                )
            .then(function(response){
                setHomeData(response.data);
                //console.log("Home response", response.data);
            })
            .catch(function(error){
                console.log(error);
            })
            //get away team data
            axios.get(
                `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${matchData.idAwayTeam}`
                )
            .then(function(response){
                setAwayData(response.data);
                //console.log("Away Response", response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }  
    }, [matchData]);
    //setting images 
    useEffect(() =>{
        if(homeData.teams)
            setHomeImg(homeData.teams[0].strTeamBadge);
        if(awayData.teams)
            setAwayImg(awayData.teams[0].strTeamBadge);
        console.log("Match is", matchData);
        console.log("Odds", odds);
    }, [homeData, awayData]);


    return(
        <div className="match">
            <div className="matchTime">
                <h2>{matchData.strDate}</h2>
                <p>{matchData.strTime}</p>
            </div>
            <div className="matchData">
                <div className="matchHeading">
                    <div className="team">
                        <img src={homeImg} alt={`${homeData.teams && homeData.teams[0].strTeam} logo`}/>
                        <h2>{matchData.strHomeTeam}</h2>
                    </div>
                    <h3 className="vs">VS</h3>
                    <div className="team">
                        <img src={awayImg} alt={`${awayData.teams && awayData.teams[0].strTeam} logo`}/>
                        <h2>{matchData.strAwayTeam} </h2>
                    </div>
                </div>
                <MatchOdds odds={odds}/>
            </div>
        </div>
    );
}

export default Match;