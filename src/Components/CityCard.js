import React from 'react'
import { Card, CardActionArea, CardContent, Typography, CardMedia, Badge } from '@material-ui/core'
import LoadingSpinner from './LoadingSpinner';
import '../Styles/CityCards.css'
import { useEffect, useState } from 'react';
import { svgPaths } from '../util.js'
import { Pagination } from '@material-ui/lab';
import SupervisorAccountSharpIcon from '@material-ui/icons/SupervisorAccountSharp';

function CityCard({ cities, images, scoreLinks, postsPerPage, totalPosts, paginate, currentPage, firstContinent, geoName, infoLinks }) {
    const [clicked, setClick] = useState(false);
    const [scores, setscores] = useState([]);
    const [hiddenScores, setHiddenScores] = useState(false);
    const [arrowVisibility, setArrowVisibility] = useState(false);
    const [changedContinent, setChangedContinent] = useState(false);
    const [cityCardHeader, setCityCardHeader] = useState(false);
    const [scoreCardHeader, setScoreCardHeader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const [cityPopulation, setCityPopulation] = useState([]);
    const [cityCountry, setCityCountry] = useState([]);
    let cityPopulationArr = [];
    let cityCountryArr = [];
    useEffect(() => {
        const setPopAndCountry = (links) => {
            links.map(link =>{
                fetch(link)
                .then(response => response.json())
                .then(data => {
                    const {population} = data;
                    const country = data._links['city:country'].name;
                    cityPopulationArr.push(population);
                    cityCountryArr.push(country);
                    setCityPopulation([...cityPopulationArr]);
                    setCityCountry([...cityCountryArr])
                })
            })
        }
        setPopAndCountry(infoLinks)
    }, [cities])

    const click = (e) => {
        setLoading(true)
        window.scrollTo(0, 0)
        setClick(true)
        const city = e.target.title
        const link = scoreLinks.find(link => link.includes(city.replace(/[,.]/g, "").toLowerCase().split(' ').join('-')))
        fetch(link)
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                const { categories } = data
                console.log(categories);
                setscores(categories)
            })

        // Display score progress
        setTimeout(() => {
            const opacity = 1
            setOpacity(opacity)
        }, 300);
        setHiddenScores(false)
        setArrowVisibility(true)
        setChangedContinent(false)
        setCityCardHeader(false)
    }

    //pagination
    let pageNumbers = Math.ceil(totalPosts / postsPerPage);

    const handleChange = (event, pageNumber) => {
        paginate(pageNumber)
        window.scrollTo(0, 0)
    };

    //hide score cards on back button click 
    const hide = () => {
        setHiddenScores(true)
        setClick(false)
        setCityCardHeader(true)
        setScoreCardHeader(false)
        window.scrollTo(0, 0)
    }

    //Hide score cards 
    useEffect(() => {
        const hideScores = (first, second) => {
            if (first !== second) setChangedContinent(true)
            setClick(false)
        }
        hideScores(firstContinent, geoName)
    }, [cities])

    // display city card header 
    useEffect(() => {
        if (firstContinent) setCityCardHeader(true)
    }, [geoName])

    // display score card header 
    useEffect(() => {
        if (clicked) setScoreCardHeader(true)
        if (cityCardHeader === true) setScoreCardHeader(false)
    }, [clicked])
console.log(cityPopulation);

    return (
        <>
            <h2 className={cityCardHeader ? "select_a_city" : "select_a_city--hidden"}>Select a city to view its score out of ten on several different categories.</h2>
            {loading ? <LoadingSpinner /> : null}
            {/**City cards*/}
            <div className={clicked ? "city__cards--hidden" : "city__cards"}>
                {cities.map((city, i) =>
                    <Card
                        className="city__card"
                        onClick={click}
                    >
                        <CardActionArea>
                            <CardMedia
                                className="city__image"
                                image={images[i]}
                                title={city}
                            />
                            <CardContent style={{display:"flex", justifyContent: "space-between"}}>
                                    <Typography
                                    >
                                        {city}
                                    </Typography>
                                    <Badge 
                                    badgeContent={cityPopulation[i]}
                                    max={100000000}
                                    // style={{color: "orange"}}
                                    color={'error'}
                                    >
                                        <Typography
                                        color="textSecondary"
                                        >Population
                                        </Typography>
                                        {/* <SupervisorAccountSharpIcon /> */}
                                    </Badge>
                                    <Typography 
                                    color="textSecondary"
                                    variant="body1"
                                    >
                                        {cityCountry[i]}
                                    </Typography>
                            </CardContent>
                            
                        </CardActionArea>
                    </Card>)}
            </div>

            {/**Pagination */}
            <div className={clicked ? "pagination--hidden" : "pagination"}>
                <Pagination count={pageNumbers} variant="outlined" shape="rounded" onChange={handleChange} page={currentPage} hidePrevButton hideNextButton />
            </div>

            <h2 className={scoreCardHeader ? "rainbow" : "rainbow--hidden"}>Here's a rainbow in case you didn't see one today :)</h2>

            {/**Score cards */}
            <div className={hiddenScores || changedContinent ? "score__cards--hidden" : 'score__cards'}>
                {/* <h1>City scores out of ten</h1> */}
                {scores.map((score) =>
                    < Card
                        className={"score__card"}
                    >
                        <CardContent
                            className="content"
                            style={{ backgroundColor: score.color }}
                        >
                            <Typography
                                variant="h4"
                                color="textSecondary"
                            >
                                {score.name}
                            </Typography>
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path d={svgPaths[score.name]} /></svg>
                            </div>

                            <div className="progress">
                                <div className="progress__done"
                                    style={{
                                        width: Math.round(score.score_out_of_10) + '0%',
                                        opacity: opacity
                                    }}
                                >
                                </div>
                            </div>
                            <div className="number">
                                <h2>{Math.round(score.score_out_of_10)}<span>/</span>10</h2>
                            </div>
                        </CardContent>
                    </Card>)}
                <div className={arrowVisibility ? "back__arrow" : "back__arrow--hidden"} onClick={hide}>
                    <ion-icon name="arrow-back-circle-outline"></ion-icon>
                </div>
            </div>
        </>
    )
}

export default CityCard
