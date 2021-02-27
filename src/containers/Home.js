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
    }, [history])


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
                    setLeagueID(4328);
                    setLeagueKey("soccer_epl");
                    setLeagueRegion("uk");
                    break;
                case 'LL':
                    setLeagueID(4335);
                    setLeagueKey("soccer_spain_la_liga");
                    setLeagueRegion("eu");
                    break;
                case 'BDL':
                    setLeagueID(4331);
                    setLeagueKey("soccer_germany_bundesliga");
                    setLeagueRegion("eu");
                    break;
                case 'MLS':
                    setLeagueID(4346);
                    setLeagueKey("soccer_usa_mls");
                    setLeagueRegion("us");
                    break;
                default:
                    setLeagueID(1);
                    setLeagueKey("soccer");
            }
            //console.log("League ", leagueSportsID, leagueOddsKey);
        }
    }, [league])



    //get API data
    const [matchData, setMatchData] = useState({}); //match data
    const [oddsData, setOddsData] = useState({}); //odds data   
    useEffect(() =>{   
        if(leagueSportsID){
            axios.get(
                `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${leagueSportsID}`
                )
            .then(function(response){
                setMatchData(response.data);
                //console.log("Response", response.data);
                //console.log("Data", matchData);
            })
            .catch(function(error){
                console.log(error);   
            })
        }
        if(leagueOddsKey){
            axios.get(
                `https://api.the-odds-api.com/v3/odds/?sport=${leagueOddsKey}&region=${leagueOddsRegion}&apiKey=${process.env.REACT_APP_API_KEY}`
                )
            .then(function(response){
                setOddsData(response.data);
                // console.log("Odds response", response.data);
                // console.log("Headers", response.headers);
            })
            .catch(function(error){
                console.log(error);
            })
        }    
    }, [leagueSportsID,leagueOddsKey, leagueOddsRegion]);

    console.log(matchData);
    //get matches data
    const [matches, setSportsMatches] = useState([]);
    const [odds, setOddsMatches] = useState([]);
    useEffect(() =>{
        if(matchData){
            //console.log("Updating match data");
            //console.log("Match Data", matchData.events);
            setSportsMatches(matchData.events);
        }
        if(oddsData){
            //console.log("Updating odds data");
            //console.log("Odds Data", oddsData.data);
            setOddsMatches(oddsData.data);
        }
    }, [matchData, oddsData]);


    if(league){
        if(Object.keys(matchData).length !== 0){
            return(
                <div className="mainWrapper">
                    <h1>{matches && matches[0] && matches[0].strLeague}</h1>
                    <div className="matches">
                        {matches && matches.map((m,i) => (
                            <Match matchData={m} allOdds={odds} key={i}/>
                    ))}
                    </div>
                </div>
            
            );
        }else{
            return(
                <div className = "mainWrapper">
                    <NotFound />
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