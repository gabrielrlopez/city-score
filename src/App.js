import { useEffect, useState } from 'react';
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import CityCard from './Components/CityCard';
import PaginationRounded from './Components/PaginationRounded';
import LoadingSpinner from './Components/LoadingSpinner';
import { getCityImages, getCityScoreLink } from './util.js'


function App() {

  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [images, setImages] = useState([]);
  const [basicCityInfo, setBasicCityInfo] = useState([])
  const [cityScoreLinks, setScoreLinks] = useState([]);
  const [click, setClick] = useState('')

  const indexOfLastCity = currentPage * postsPerPage;
  const indexOfFirstCity = indexOfLastCity - postsPerPage;
  const currentCities = cities.slice(indexOfFirstCity, indexOfLastCity);


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
    setClick(true)
  }

  // Set images for current cities
  useEffect(() => {
    const setCityImages = async () => {
      const getImages = currentCities.map(city => getCityImages(city));
      const images = await Promise.all(getImages);
      setImages(images)
    }
    setCityImages()

    const setCityScoreLinks = async () => {
      const getLinks = currentCities.map(city => getCityScoreLink(city));
      const links = await Promise.all(getLinks);
      setScoreLinks(links)
    }
    setCityScoreLinks()
  }, [currentCities.length, currentPage])



  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  console.log(click);

  return (
    <div className="App">

      <div className="header">
        <FormControl>
          <Select
            onChange={onContinentChange}
            variant="outlined"
          >
            {continents.map(continent => <MenuItem value={continent.geonames}>{continent.name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>


      <CityCard
        cities={currentCities}
        images={images}
        links={cityScoreLinks}
        postsPerPage={postsPerPage}
        totalPosts={cities.length}
        paginate={paginate}
        currentPage={currentPage}
        changedContinent={click}
      />

      {/* <PaginationRounded
        postsPerPage={postsPerPage}
        totalPosts={cities.length}
        paginate={paginate}
        currentPage={currentPage}
      /> */}
    </div>
  );
}

export default App;
