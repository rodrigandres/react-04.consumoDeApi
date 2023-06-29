import './App.css';
import React, { useState } from 'react';
import MiApi from './assets/components/MiApi';
import Buscador from './assets/components/Buscador';
import FilterButton from './assets/components/Filtrado';
import { Container } from 'react-bootstrap';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState({});

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  const filterTeams = (team) => {
    if (searchText === '') {
      return true;
    }

    const teamName = team.teamName || (team.team && team.team.name);
    const leagueRecord = team.leagueRecord || (team.team && team.team.leagueRecord);

    return (teamName.toLowerCase().includes(searchText.toLowerCase()) || (leagueRecord && (leagueRecord.wins + '-' + leagueRecord.losses).includes(searchText.toLowerCase()))
    )
  };

  function getFilteredAndSortedGames(sortBy) {
    let filteredGames = {...data};

    if (sortBy === 'date' && filteredGames.dates) {
      filteredGames.dates[0].games.sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate));
    } else if (sortBy === 'team' && filteredGames.dates) {
      filteredGames.dates[0].games.sort((a, b) =>
        a.teams.away.team.name.localeCompare(b.teams.away.team.name)
      );
    }
    setData(filteredGames);
  }

  return (
    <Container fluid>
      <h1>MLB Schedule</h1>
      <Buscador searchText={searchText} setSearchText={setSearchText} onSearch={handleSearch}/>
      <FilterButton onFilterAndSort={getFilteredAndSortedGames} mlbStats={data}/>
      <MiApi {...{data, setData, filterTeams}} />
    </Container>
  );
};

export default App;
