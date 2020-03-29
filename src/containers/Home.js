import React, {useEffect, useState} from "react";
import axios from "axios";

import {useHistory} from "react-router-dom";

import Match from "../components/Match.js";


//Odds API Key
const oddsKey = "39d1e7c2982a6d676981b51ce23459ba";

function Home(){
    /*--- URL Parameters ---*/
    const [league, setLeague] = useState(""); //URL search parameter
    let history = useHistory();
    //get league from URL
    useEffect(() =>{
        //get search parameters
        let searchParams = history.location.search;
        const urlParams = new URLSearchParams(searchParams);
        let league = urlParams.get("league");
        if(league){
            setLeague(league);
        }
        //console.log("League is", league);
    }, [history])


    /*--- API Calls ---*/
    const [leagueSportsID, setLeagueID] = useState(); //id for sports db 
    const [leagueOddsKey, setLeagueKey] = useState(""); //id for odds api 
    const [leagueOddsRegion, setLeagueRegion] = useState(""); //region for odds api 
    //set up correct API calls 
    useEffect(() =>{
        //console.log("Testing", league);
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
                `https://api.the-odds-api.com/v3/odds/?sport=${leagueOddsKey}&region=${leagueOddsRegion}&apiKey=${oddsKey}`
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
}

export default Home;