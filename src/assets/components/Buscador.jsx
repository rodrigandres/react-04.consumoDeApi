import React, {  useEffect } from 'react';
import { Form } from 'react-bootstrap';

const Buscador = ({ onSearch, searchText, setSearchText }) => {
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    onSearch(searchText);
  }, [searchText]);
  
  return (
    <Form>
      <Form.Group>
        <Form.Control type="text" value={searchText} onChange={handleInputChange} placeholder="Buscar equipos" className='mb-3'/>
      </Form.Group>
    </Form>
  );
};

export default Buscador;
