import { useEffect, useState } from 'react'
import './App.css';
import { FormControl, Select, MenuItem, ClickAwayListener } from '@material-ui/core'
import CityCard from './Components/CityCard';
import PaginationRounded from './Components/PaginationRounded'


function App() {

  const [cities, setCities] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const [images, setImages] = useState([])


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
        const cities = data._links['ua:items'].map(city => city.name)
        setCities(cities)
      })
    setCurrentPage(1)
  }

  // Get current posts 
  const indexOfLastCity = currentPage * postsPerPage;
  const indexOfFirstCity = indexOfLastCity - postsPerPage;
  const currentCities = cities.slice(indexOfFirstCity, indexOfLastCity);


  // Get photos for current cities 
  const getCityImage = (cityName) => (
    fetch(`https://api.teleport.org/api/urban_areas/?embed=ua:item/ua:images`)
      .then(response => response.json())
      .then(data => {
        let city = data._embedded['ua:item'].find(city => city.name === cityName);
        let { image } = city._embedded["ua:images"]['photos'][0];
        return image;
      })

  )

  const setCityImages = async () => {
    const asyncFunctions = currentCities.map(city => getCityImage(city));
    const results = await Promise.all(asyncFunctions);
    setImages(results)
  }

  console.log(images);



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


      <CityCard
        cities={currentCities}
      />

      <PaginationRounded
        postsPerPage={postsPerPage}
        totalPosts={cities.length}
        paginate={paginate}
        currentPage={currentPage}
      />

    </div>
  );
}

export default App;
