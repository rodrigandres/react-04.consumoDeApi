import './App.css';
import React, { useState } from 'react';
import MiApi from './assets/components/MiApi';
import Buscador from './assets/components/Buscador';
import FilterButton from './assets/components/Filtrado';
import { Container } from 'react-bootstrap';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [filterBy, setFilterBy] = useState('all');
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

  const filteredAndSortedGames =  [] //getFilteredAndSortedGames();

  function getFilteredAndSortedGames(sortBy) {
    let filteredGames = {...data};

    if (filterBy !== 'all') {
      filteredGames = filteredGames.filter(
        (game) => game.teams.away.teamId === filterBy || game.teams.home.teamId === filterBy
      );
    }

    if (sortBy === 'date' && filteredGames.dates) {
      filteredGames.dates[0].games.sort((a, b) => new Date(a.gameDate) - new Date(b.gameDate));
    } else if (sortBy === 'team' && filteredGames.dates) {
      filteredGames.dates[0].games.sort((a, b) =>
        a.teams.away.team.name.localeCompare(b.teams.away.team.name)
      );
    }

    console.log('filtered game:', filteredGames)
    setData(filteredGames)
    return filteredGames;
  }


  return (
    <Container fluid>
      <h2>MLB Schedule</h2>
      <Buscador onSearch={handleSearch}/>
      <FilterButton onFilterAndSort={getFilteredAndSortedGames} mlbStats={data} filteredAndSortedGames={filteredAndSortedGames} filterBy={filterBy}/>
      <MiApi {...{data, setData, filterTeams}} />
    </Container>
  );
};

export default App;
