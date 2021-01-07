import React from 'react'
import { Card, CardActionArea, CardContent, Typography, CardMedia } from '@material-ui/core'
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import '../Styles/CityCards.css'
import { useEffect, useState } from 'react';
import { svgPaths } from '../util.js'
import { Pagination } from '@material-ui/lab';

function CityCard({ cities, images, links, postsPerPage, totalPosts, paginate, currentPage }) {
    const [clicked, setClick] = useState(false)
    const [scores, setscores] = useState([])
    const [hiddenScores, setHiddenScores] = useState(false)
    const [arrowVisibility, setArrowVisibility] = useState(false)

    const click = (e) => {
        setClick(true)
        const city = e.target.title
        const link = links.find(link => link.includes(city.toLowerCase().split(' ').join('-')))
        fetch(link)
            .then(response => response.json())
            .then(data => {
                const { categories } = data
                setscores(categories)
            })
        setHiddenScores(false)
        setArrowVisibility(true)
    }
    console.log(scores);

    //pagination
    let pageNumbers = Math.ceil(totalPosts / postsPerPage);

    const handleChange = (event, pageNumber) => {
        paginate(pageNumber)
    };

    //hide score cards on back button click 
    const hide = () => {
        setHiddenScores(true)
        setClick(false)
    }

    return (
        <>
            {/**City cards*/}
            <div className={clicked ? "city__cards--hidden" : "city__cards"}>
                {cities.map((city, i) =>
                    <Card
                        className="city__card"
                    >
                        <CardActionArea>
                            <CardMedia
                                className="city__image"
                                image={images[i]}
                                title={city}
                                onClick={click}
                            />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {city}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>)}
            </div>

            {/**Pagination */}
            <div className={clicked ? "pagination--hidden" : "pagination"}>
                <Pagination count={pageNumbers} variant="outlined" shape="rounded" onChange={handleChange} page={currentPage} hidePrevButton hideNextButton />
            </div>

            {/**Score cards */}
            <div className={hiddenScores ? "score__cards--hidden" : "score__cards"}>
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
                                        width: Math.ceil(score.score_out_of_10) + '0%',
                                        opacity: 1
                                    }}
                                >
                                </div>
                            </div>

                            <div className="number">
                                <h2>{Math.ceil(score.score_out_of_10)}<span>/</span>10</h2>
                            </div>
                        </CardContent>
                    </Card>)}
                {/* <ArrowBackSharpIcon
                    onClick={hide}
                    className={arrowVisibility ? "back__arrow" : "back__arrow--hidden"}
                    fontSize="large"
                /> */}

                <div className={arrowVisibility ? "back__arrow" : "back__arrow--hidden"} onClick={hide}>
                    <ion-icon name="arrow-back-circle-outline"></ion-icon>
                </div>
            </div>
        </>
    )
}

export default CityCard
