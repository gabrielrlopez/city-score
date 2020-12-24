import React from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core'
import '../Styles/CityCards.css'

function CityCard({ cities }) {
    return (
        <div className="city__cards">
            {cities.map(city =>
                <Card

                >
                    <CardActionArea>
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
