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
  const [visibility, setVisibility] = useState(false)

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
    setVisibility(true)
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


  return (
    <div className="App">

      <div className="header">
        <h1 className="title">Urban City Scores</h1>
        <h2 className={!visibility ? "select_a_continent" : "select_a_continent--hidden"}>Select a continent to begin.</h2>
        <FormControl
          className="form__control"
        >
          <Select
            onChange={onContinentChange}
            variant="outlined"
          >
            {continents.map(continent => <MenuItem value={continent.geonames}>{continent.name}</MenuItem>)}
          </Select>
        </FormControl>
        <h2 className={visibility && cities.length > 0 ? "select_a_city" : "select_a_city--hidden"}>Select a city to view its score out of ten on several different categories.</h2>
      </div>

      <div className={!visibility ? "card__container" : "card__container--hidden"}></div>

      <CityCard
        cities={currentCities}
        images={images}
        links={cityScoreLinks}
        postsPerPage={postsPerPage}
        totalPosts={cities.length}
        paginate={paginate}
        currentPage={currentPage}
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
