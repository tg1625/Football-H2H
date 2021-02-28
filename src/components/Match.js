import React, {useEffect, useState} from "react";
// import axios from 'axios';
import MatchOdds from './MatchOdds.js';
import MatchTime from './MatchTime.js';

function Match({matchData,allOdds}){

    //find odds for this match 
    const [odds, setOdds] = useState();
    useEffect(() =>{
        if(allOdds){
            for(var i = 0; i < allOdds.length; i++){
                if(allOdds[i].home_team === matchData.homeName){
                    setOdds(allOdds[i]);
                    break;
                }
            }
            //console.log("Match is", matchData);
            //console.log("Odds", odds);
        }
    }, [allOdds, matchData]);
    

    /*--- Getting images for each team --- */
    // const [homeData, setHomeData] = useState({});
    // const [awayData, setAwayData] = useState({});
    // const [homeImg, setHomeImg] = useState('');
    // const [awayImg, setAwayImg] = useState('');
    // const elenaRequests = axios.create({
    //     baseURL: 'https://football.elenasport.io/v2/teams/',
    //     timeout: 10000,
    //     headers: {Authorization: `Bearer ${process.env.REACT_APP_ELENA_ACCESS_TOKEN}`}
    // });
    // //get data for each team
    // useEffect(() =>{   
    //     if(matchData){
    //         //get home team data
    //         elenaRequests.get(
    //             `/${matchData.idHome}`
    //             )
    //         .then(function(response){
    //             setHomeData(response.data);
    //             console.log("Home response", response.data);
    //         })
    //         .catch(function(error){
    //             console.log(error);
    //         })
    //         //get away team data
    //         elenaRequests.get(
    //             `/${matchData.idAway}`
    //             )
    //         .then(function(response){
    //             setAwayData(response.data);
    //             console.log("Away Response", response.data);
    //         })
    //         .catch(function(error){
    //             console.log(error);
    //         })
    //     }  
    // }, [matchData]);
    // //setting images 
    // useEffect(() =>{
    //     if(homeData)
    //         setHomeImg(homeData.badgeURL);
    //     if(awayData)
    //         setAwayImg(awayData.badgeURL);
    // }, [homeData, awayData]);


    return(
        <div className="match">
            <MatchTime date={matchData.date}/>
            <div className="matchData">
                <div className="matchHeading">
                    <div className="team">
                        <img src={`https://cdn.elenasport.io/badges/150x150/${matchData.idHome}`} alt={`${matchData.homeName} logo`}/>
                        <h2>{matchData.strHomeTeam}</h2>
                    </div>
                    <h3 className="vs">VS</h3>
                    <div className="team">
                        <img src={`https://cdn.elenasport.io/badges/150x150/${matchData.idAway}`} alt={`${matchData.awayName} logo`}/>
                        <h2>{matchData.strAwayTeam} </h2>
                    </div>
                </div>
                <MatchOdds odds={odds}/>
            </div>
        </div>
    );
}

export default Match;