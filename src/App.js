import { useEffect, useState } from 'react';
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import CityCard from './Components/CityCard';
import LoadingSpinner from './Components/LoadingSpinner';
import { getBasicCityInfoLinks, getCityImages, getCityScoreLink } from './util.js'


function App() {

  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [images, setImages] = useState([]);
  const [basicCityInfoLinks, setBasicCityInfoLinks] = useState([]);
  const [cityScoreLinks, setScoreLinks] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [firstContinent, setFirstContinent] = useState('');
  const [geoName, setGeoName] = useState('');
  const [triggered, setTriggered] = useState(false);
  const [loading, setLoading] = useState(false);

  const indexOfLastCity = currentPage * postsPerPage;
  const indexOfFirstCity = indexOfLastCity - postsPerPage;
  const currentCities = cities.slice(indexOfFirstCity, indexOfLastCity);


  const continents = [
    { name: 'Africa', geonames: 'AF' },
    { name: 'Asia', geonames: 'AS' },
    { name: 'Europe', geonames: 'EU' },
    { name: 'North America', geonames: 'NA' },
    { name: 'Oceania', geonames: 'OC' },
    { name: 'South America', geonames: 'SA' },
  ]

  const firstContinentSelected = (e) => {
    setTriggered(true)
    const firstContinent = e.target.value
    setFirstContinent(firstContinent)
  }

  const onContinentChange = (e) => {
    setLoading(true)
    const geoName = e.target.value
    setGeoName(geoName)
    fetch(`https://api.teleport.org/api/continents/geonames%3A${geoName}/urban_areas/`)
      .then(response => response.json())
      .then(data => {
        setLoading(false)
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

    //Get city population and country city belongs too links
    const setPopAndCountry = async () => {
      const getInfo = currentCities.map(city => getBasicCityInfoLinks(city));
      const links = await Promise.all(getInfo);
      setBasicCityInfoLinks(links)
    }
    setPopAndCountry()
    // Get links to fetch city scores 
    const setCityScoreLinks = async () => {
      const getLinks = currentCities.map(city => getCityScoreLink(city));
      const links = await Promise.all(getLinks);
      setScoreLinks(links)
    }
    setCityScoreLinks()
  }, [currentCities.length, currentPage])

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  console.log(basicCityInfoLinks);

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">Urban City Scores</h1>
        <h2 className={!visibility ? "select_a_continent" : "select_a_continent--hidden"}>Select a continent to begin.</h2>
        <FormControl>
          <Select
            onChange={onContinentChange}
            onClick={!triggered ? firstContinentSelected : null}
            variant="outlined"
          >
            {continents.map(continent => <MenuItem value={continent.geonames}>{continent.name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>

      <div className={!visibility ? "card__container" : "card__container--hidden"}></div>

      {loading ? <LoadingSpinner className="spinner" /> :
        <CityCard
          cities={currentCities}
          images={images}
          scoreLinks={cityScoreLinks}
          infoLinks={basicCityInfoLinks}
          postsPerPage={postsPerPage}
          totalPosts={cities.length}
          paginate={paginate}
          currentPage={currentPage}
          firstContinent={firstContinent}
          geoName={geoName}
        />
      }
    </div>
  );
}

export default App;
