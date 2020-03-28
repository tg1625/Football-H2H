import React, {useEffect, useState} from "react";
import axios from "axios";

import {useHistory} from "react-router-dom";

import Match from "../components/Match.js";


//API Key
const sportsKey = "";
const oddsKey = "39d1e7c2982a6d676981b51ce23459ba";

function Home(){

    const [league, setLeague] = useState(""); //URL search parameter
    const [matchData, setMatchData] = useState({}); //match data
    const [oddsData, setOddsData] = useState({}); //odds data 

    const [matches, setSportsMatches] = useState([]);
    const [odds, setOddsMatches] = useState([]);

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

    //get sports API data
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
        // if(leagueOddsKey){
        //     axios.get(
        //         `https://api.the-odds-api.com/v3/odds/?sport=${leagueOddsKey}&region=${leagueOddsRegion}&apiKey=${oddsKey}`
        //         )
        //     .then(function(response){
        //         setOddsData(response.data);
        //         console.log("Odds response", response.data);
        //     })
        //     .catch(function(error){
        //         console.log(error);
        //     })
        // }   
    }, [leagueSportsID, leagueOddsKey]);

    //get sports api matches 
    useEffect(() =>{
        console.log("Updating match data");
        if(matchData){
            //console.log("Match Data", matchData.events);
            setSportsMatches(matchData.events);
        }
        if(oddsData){
            //console.log("Odds Data", oddsData.data);
            setOddsMatches(oddsData.data);
        }
    }, [matchData, oddsData]);

 

    return(
        <div className="matches">
            {matches && matches.map((m,i) => (
                <p><Match matchData={m} allOdds={odds}/></p>
          ))}
        </div>
       
    );
}

export default Home;