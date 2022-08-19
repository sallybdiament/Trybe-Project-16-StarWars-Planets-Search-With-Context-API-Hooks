import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Starwars() {
  const { planets, filterByName, setFilterByName,
    filterByNumericValues, setFilterByNumericValues,
    filterByNumericValuesObject,
    setFilterByNumericValuesObject,
    columns, setColumns,
  } = useContext(AppContext);

  const handleChange = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const onInputChange = ({ target }) => {
    setFilterByNumericValuesObject({
      ...filterByNumericValuesObject, [target.name]: target.value });
  };

  const onFilterClick = async () => {
    await setFilterByNumericValues([
      ...filterByNumericValues,
      filterByNumericValuesObject]);
  };

  const onRemoveAllClick = () => {
    setFilterByNumericValues([]);
  };

  const onRemoveClick = (event) => {
    const { id } = event.target;
    const newFilters = filterByNumericValues.filter((filter) => filter.column !== id);
    const newColumns = columns.concat(id);
    setFilterByNumericValues(newFilters);
    setColumns(newColumns);
    // colocar a key como nome da coluna e fazer o filtro por isso.
  };

  return (
    <div>
      <label htmlFor="searchName">
        Procure um país:
        <input
          type="text"
          data-testid="name-filter"
          name="searchName"
          id="searchName"
          //   value={  }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="column">
        Coluna:
        <select
          data-testid="column-filter"
          name="column"
          id="column"
          onChange={ onInputChange }
        >
          { columns.map((column, index) => (
            <option key={ index }>{column}</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison">
        Operador:
        <select
          data-testid="comparison-filter"
          name="comparison"
          id="comparison"
          onChange={ onInputChange }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          id="value"
          value={ filterByNumericValuesObject.value }
          onChange={ onInputChange }
        />
      </label>
      <button
        type="submit"
        data-testid="button-filter"
        onClick={ onFilterClick }
      >
        Filtrar
      </button>

      {filterByNumericValues
        .map((filter, index) => (
          <div
            key={ index }
            data-testid="filter"
          >
            <span>
              {filter.column}
              {' '}
            </span>
            <span>
              {filter.comparison}
              {' '}
            </span>
            <span>
              {filter.value}
              {' '}
            </span>
            <span>
              <button
                type="submit"
                key={ filter.column }
                id={ filter.column }
                onClick={ onRemoveClick }
              >
                Excluir
              </button>
            </span>
          </div>
        ))}

      <button
        type="submit"
        data-testid="button-remove-filters"
        onClick={ onRemoveAllClick }
      >
        Remover todas filtragens
      </button>
      <label htmlFor="columnSort">
        Coluna para ordenar:
        <select
          data-testid="column-sort"
          name="columnSort"
          id="columnSort"
          // onChange={ onInputSortChange }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <input type="radio" value="ASC" name="order" />
      {' '}
      ASC
      <input type="radio" value="DESC" name="order" />
      {' '}
      DESC

      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Rotation Period
            </th>
            <th>
              Orbital Period
            </th>
            <th>
              Diameter
            </th>
            <th>
              Climate
            </th>
            <th>
              Gravity
            </th>
            <th>
              Terrain
            </th>
            <th>
              Surface Water
            </th>
            <th>
              Population
            </th>
            <th>
              Films
            </th>
            <th>
              Created
            </th>
            <th>
              Edited
            </th>
            <th>
              Url
            </th>
          </tr>
        </thead>
        <tbody>
          { planets
            .filter((planet) => planet.name.includes(filterByName.name))
            .map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{ planet.name}</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films.map((film) => film) }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Starwars;
