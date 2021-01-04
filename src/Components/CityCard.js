import React from 'react'
import { Card, CardActionArea, CardContent, Typography, CardMedia } from '@material-ui/core'
import '../Styles/CityCards.css'
import { useEffect, useState } from 'react';
import { svgPaths } from '../util.js'
import { Doughnut, defaults } from 'react-chartjs-2';

function CityCard({ cities, images, links }) {

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

    const data = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{
            data: scores.map(score => score.score_out_of_10),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };

    console.log(data.datasets[0]['data']);

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
            </div>

            <div className="score__cards">
                {scores.map((score, i) =>
                    <Card className="score__card">
                        <CardContent
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
                            <Doughnut data={data} />
                        </CardContent>
                    </Card>)}
            </div>
        </>
    )
}

export default CityCard
