import React from 'react'
import { Card, CardActionArea, CardContent, Typography, CardMedia } from '@material-ui/core'
import '../Styles/CityCards.css'
import { useEffect, useState } from 'react';

function CityCard({ cities, images, links }) {

    const [scores, setscores] = useState([])

    const click = (e) => {
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
    return (
        <>
            <div className="city__cards">
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
                {scores.map(score => <Card>
                    <CardContent
                        style={{ backgroundColor: score.color }}
                    >
                        <Typography
                            variant="body2"
                            color="textSecondary"
                        >
                            {score.name}
                        </Typography>
                    </CardContent>
                </Card>)}
            </div>
        </>
    )
}

export default CityCard
