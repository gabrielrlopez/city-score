import React from 'react'
import { Card, CardActionArea, CardContent, Typography, CardMedia } from '@material-ui/core'
import '../Styles/CityCards.css'

function CityCard({ cities, cityImage }) {
    return (
        <div className="city__cards">
            {cities.map(city =>
                <Card
                    className="city__card"
                >
                    <CardActionArea>
                        <CardMedia
                            className="city__image"
                            image={cityImage}
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
    )
}

export default CityCard
