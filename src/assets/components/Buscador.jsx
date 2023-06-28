import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Buscador = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Control type="text" value={searchText} onChange={handleInputChange} placeholder="Buscar equipos" className='mb-3'/>
      </Form.Group>
      <Button variant="info" onClick={handleSearch} className='mb-3' >Buscar</Button>
    </Form>
  );
};

export default Buscador;
