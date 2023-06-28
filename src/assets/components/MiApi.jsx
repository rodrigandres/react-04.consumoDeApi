import { useEffect, useState } from 'react'
import Card from './Card';
import { Row, Col } from 'react-bootstrap';

const TeamInfo = ({ team }) => {
  const { teamName, probablePitcher, leagueRecord } = team;
  const teamFullName = teamName || (team.team && team.team.name);

  return (
    <div>
      <h3>{teamFullName}</h3>
      <p>League Record (W-L): {leagueRecord.wins}-{leagueRecord.losses}</p>
      <p>Probable Pitcher: {probablePitcher && probablePitcher.fullName}</p>
    </div>
  );
};

const MiApi = ({ data, setData, filterTeams }) => {
  const getMLBStats = async () => {
    try {
      const response = await fetch('https://statsapi.mlb.com/api/v1/schedule?sportId=1&hydrate=decisions,probablePitcher(note),linescore');
      const res = await response.json();
      setData(res);
    } catch (error) {
      console.error('Error fetching MLB stats', error);
    }
  };

  useEffect(() => {
    getMLBStats();
  }, []);

  return (
    <div className='row'>
        {data && data?.dates && data.dates.map((date) => (
          <div key={date.date}>
            <h3 className='mt-3'>Date: {date.date}</h3>
            <Row xs={1} lg={3} xl={4}>
              {date.games.filter((game) => filterTeams(game.teams.away) || filterTeams(game.teams.home)).map((game) => (
                <Col key={game.gamePk} className='mb-3'>
                  <Card className="custom-card">
                      <TeamInfo team={game?.teams?.away} leagueRecord={game?.teams?.away?.leagueRecord}/>
                      <TeamInfo team={game?.teams?.home} leagueRecord={game?.teams?.home?.leagueRecord}/>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </div>
  );
};

export default MiApi;
