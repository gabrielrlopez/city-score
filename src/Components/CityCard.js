import React from 'react'
import { Card, CardActionArea, CardContent, Typography, CardMedia } from '@material-ui/core'
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import '../Styles/CityCards.css'
import { useEffect, useState } from 'react';
import { svgPaths } from '../util.js'
import { Pagination } from '@material-ui/lab';

function CityCard({ cities, images, links, postsPerPage, totalPosts, paginate, currentPage, changedContinent }) {
    const [clicked, setClick] = useState(false)
    const [scores, setscores] = useState([])

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
    }
    console.log(scores);
    //pagination
    let pageNumbers = Math.ceil(totalPosts / postsPerPage);

    const handleChange = (event, pageNumber) => {
        paginate(pageNumber)
    };

    return (
        <>
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
                <Pagination count={pageNumbers} variant="outlined" shape="rounded" onChange={handleChange} page={currentPage} hidePrevButton hideNextButton />
            </div>

            <div className="score__cards">
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

                            {/* <svg>
                                    <circle cx='70' cy='70' r='70'></circle>
                                    <circle
                                        cx='70' cy='70' r='70'
                                        style={{
                                            stroke: "#00ff43",
                                            strokeDashoffset: 440 - (440 * Math.ceil(score.score_out_of_10) * 10) / 100
                                        }}
                                    ></circle>
                                </svg> */}
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
            </div>
        </>
    )
}

export default CityCard
