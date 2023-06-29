import { useState } from 'react';
import { Button, Dropdown} from 'react-bootstrap';

const FilterButton = ({ onFilterAndSort }) => {
    const [sortBy, setSortBy] = useState('date');

    const handleSortChange = (eventKey) => {
      setSortBy(eventKey);
    };

    const handleClick = () => {
        if (typeof onFilterAndSort === 'function') {
            onFilterAndSort(sortBy);
        }
    };

    return (
      <div>
        <Dropdown className="mt-2">
          <Dropdown.Toggle variant="info" id="dropdown-sort-by" >
            Ordenar por:
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="date" onClick={() => handleSortChange('date')}>
              Date
            </Dropdown.Item>
            <Dropdown.Item eventKey="team" onClick={() => handleSortChange("team")}>
              A-Z
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="info" className="mt-2" onClick={handleClick}>
          Aplicar
        </Button>
      </div>
    );
  };

export default FilterButton