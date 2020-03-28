import React from 'react';


function Header(){
    return(
        <header className="header">
            <h2>Sports Odds</h2>
            <div className="leagueNav">
                <a href="/?league=EPL">English Premier League</a>
                <a href="/?league=LL">La Liga</a>
                <a href="/?league=BDL">Bundesliga</a>
                <a href="/?league=MLS">Major League Soccer</a>
            </div>
        </header>
    );
}

export default Header;