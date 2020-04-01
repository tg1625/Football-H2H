import React from 'react';


function Header(){
    return(
        <header className="header">
            <a className="title" href="/">Soccer Odds</a>
            <div className="leagueNav">
                <a href="/?league=EPL" title="English Premier League"><img src="https://www.thesportsdb.com/images/media/league/badge/i6o0kh1549879062.png" alt="English Premier League logo"/></a>
                <a href="/?league=LL" title="Spanish La Liga"><img src="https://www.thesportsdb.com/images/media/league/badge/7onmyv1534768460.png" alt="Spanish La Liga Logo"/></a>
                <a href="/?league=BDL" title="German Bundesliga"><img src="https://www.thesportsdb.com/images/media/league/badge/0j55yv1534764799.png" alt="German Bundesliga Logo"/></a>
                <a href="/?league=MLS" title="American Major League Soccer"><img src="https://www.thesportsdb.com/images/media/league/badge/dqo6r91549878326.png" alt="American Major League Soccer Logo"/></a>
            </div>
        </header>
    );
}

export default Header;