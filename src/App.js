import { useEffect, useState } from 'react'
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core'
import CityCard from './Components/CityCard';
import PaginationRounded from './Components/PaginationRounded'

function App() {

  const [cities, setCities] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

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

  // Get current posts 
  const indexOfLastCity = currentPage * postsPerPage;
  const indexOfFirstCity = indexOfLastCity - postsPerPage;
  const currentCities = cities.slice(indexOfFirstCity, indexOfLastCity);

  // Change page 
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

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


      <CityCard cities={currentCities} />

      <PaginationRounded postsPerPage={postsPerPage} totalPosts={cities.length} paginate={paginate} />

    </div>
  );
}

export default App;
