import React from 'react'
import { Card, CardActionArea, CardContent, Typography, CardMedia } from '@material-ui/core'
import '../Styles/CityCards.css'

function CityCard({ cities, images }) {
    return (
        <div className="city__cards">
            {cities.map((city, i) =>
                <Card
                    className="city__card"
                >
                    <CardActionArea>
                        <CardMedia
                            className="city__image"
                            image={images[i]}
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
