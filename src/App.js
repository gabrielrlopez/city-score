import { useEffect, useState } from 'react'
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core'
import CityCard from './CityCard';

function App() {

  const [cities, setCities] = useState([])

  const continents = [
    { name: 'Africa', geonames: 'AF' },
    { name: 'Antartica', geonames: 'AN' },
    { name: 'Asia', geonames: 'AS' },
    { name: 'Europe', geonames: 'EU' },
    { name: 'North America', geonames: 'NA' },
    { name: 'Oceania', geonames: 'OC' },
    { name: 'South America', geonames: 'SA' },
  ]


  const onContinentChange = (e) => {
    const geoName = e.target.value

    fetch(`https://api.teleport.org/api/continents/geonames%3A${geoName}/urban_areas/`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const cities = data._links['ua:items'].map(city => city.name)
        setCities(cities)
      })
  }




  return (
    <div className="App">
      <h1>Quality of life</h1>

      <FormControl>
        <Select
          onChange={onContinentChange}
          variant="outlined"
        >
          {continents.map(continent => <MenuItem value={continent.geonames}>{continent.name}</MenuItem>)}
        </Select>
      </FormControl>

      <CityCard cities={cities} />
    </div>
  );
}

export default App;
