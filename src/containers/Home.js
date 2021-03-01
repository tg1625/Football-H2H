import React, {useEffect, useState} from "react";
import axios from "axios";

import {useHistory} from "react-router-dom";

import Match from "../components/Match.js";
import NotFound from "../components/NotFound.js";

function Home(){
    /*--- URL Parameters ---*/
    const [league, setLeague] = useState(); //URL search parameter
    let history = useHistory();


    //get league from URL
    useEffect(() =>{
        if(history){
            //get search parameters
        let searchParams = history.location.search;
        const urlParams = new URLSearchParams(searchParams);
        let league = urlParams.get("league");
        if(league){
            setLeague(league);
        }
        //console.log("League is", league);
        }
    }, [history]);


    /*--- API Calls ---*/
    const [leagueSportsID, setLeagueID] = useState(); //id for sports db 
    const [leagueOddsKey, setLeagueKey] = useState(); //id for odds api 
    const [leagueOddsRegion, setLeagueRegion] = useState(); //region for odds api 
    //set up correct API calls 
    useEffect(() =>{
        //console.log("Testing", league);
        if(league){
            switch(league){
                case 'EPL':
                    setLeagueID(234);
                    setLeagueKey("soccer_epl");
                    setLeagueRegion("uk");
                    break;
                case 'LL':
                    setLeagueID(466);
                    setLeagueKey("soccer_spain_la_liga");
                    setLeagueRegion("eu");
                    break;
                case 'BDL':
                    setLeagueID(272);
                    setLeagueKey("soccer_germany_bundesliga");
                    setLeagueRegion("eu");
                    break;
                case 'MLS':
                    setLeagueID(507);
                    setLeagueKey("soccer_usa_mls");
                    setLeagueRegion("us");
                    break;
                default:
                    setLeagueID(1);
                    setLeagueKey("soccer");
            }
            //console.log("League ", leagueSportsID, leagueOddsKey);
        }
    }, [league]);

    //set Access Token
    const [elenaAccessToken, setToken] = useState('');
    useEffect(() =>{
        if(!elenaAccessToken){
            var queryString = require('query-string');
            axios.post(
                'https://oauth2.elenasport.io/oauth2/token',
                queryString.stringify({'grant_type': 'client_credentials'}), 
                {headers:
                    {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${process.env.REACT_APP_ELENA_API_KEY}`
                    }
                }).then(function(response){
                    // console.log(response);
                    setToken(response.data.access_token);
                    console.log("Token is", response.data.access_token);

                }).catch(function(error){
                    console.log(error);
                });
        }
    }, [elenaAccessToken]);


    //Get Data from APIs
  
    //get data from Elena API
    const [matches, setSportsMatches] = useState([]);
    useEffect(() =>{   
        if(leagueSportsID && elenaAccessToken){ //upcoming match data
            axios.get(
                `https://football.elenasport.io/v2/leagues/${leagueSportsID}/seasons?expand=upcoming`
                , {headers: {Authorization: `Bearer ${elenaAccessToken}`}})
            .then(function(response){
                console.log("Elena API", response.data.data);
                setSportsMatches(response.data.data[0].expand.upcoming);
            })
            .catch(function(error){
                console.log(error);
            })
        } 
    }, [leagueSportsID, elenaAccessToken]);

    //get data from the Odds Api
    const [odds, setOddsMatches] = useState([]);
    useEffect(() =>{   
        if(leagueOddsKey && elenaAccessToken){
            axios.get(
                `https://api.the-odds-api.com/v3/odds/?sport=${leagueOddsKey}&region=${leagueOddsRegion}&apiKey=${process.env.REACT_APP_BACKUP_API_KEY}`
                )
            .then(function(response){
                console.log("Odds API", response.data);
                setOddsMatches(response.data.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }  
    }, [leagueOddsKey, leagueOddsRegion, elenaAccessToken]);



    /*Returning things */
    if(league){
        if(matches.length !== 0){
            return(
                <div className="mainWrapper">
                    <h1>{matches && matches[0] && matches[0].leagueName}</h1>
                    <div className="matches">
                        {matches && matches.map((m,i) => (
                            <Match matchData={m} allOdds={odds} key={i}/>
                    ))}
                    </div>
                </div> 
            
            );
        }
        // else if(matchData.length == 0){
        //     return(
        //         <div className = "mainWrapper">
        //             <h2>No Matches Found</h2>
        //         </div> 
        //     );
        // }
        else{
            return(
                <div className = "mainWrapper">
                    {/* <NotFound /> */}
                </div> 
            );
        }
    }else{
        return(
            <div className="mainWrapper">
                <div className="homeNav">
                    <a href="/?league=EPL" title="English Premier League">
                        <img src="https://www.thesportsdb.com/images/media/league/badge/i6o0kh1549879062.png" alt="English Premier League logo"/>
                        <h3>Premier League</h3>
                    </a>
                    <a href="/?league=LL" title="Spanish La Liga">
                        <img src="https://www.thesportsdb.com/images/media/league/badge/7onmyv1534768460.png" alt="Spanish La Liga Logo"/>
                        <h3>La Liga</h3>
                    </a>
                    <a href="/?league=BDL" title="German Bundesliga">
                        <img src="https://www.thesportsdb.com/images/media/league/badge/0j55yv1534764799.png" alt="German Bundesliga Logo"/>
                        <h3>Bundesliga</h3>
                        </a>
                    <a href="/?league=MLS" title="American Major League Soccer">
                        <img src="https://www.thesportsdb.com/images/media/league/badge/dqo6r91549878326.png" alt="American Major League Soccer Logo"/>
                        <h3>Major League Soccer</h3>
                    </a>
                </div>
            </div>
        )
    }

}

export default Home;