import React from 'react'
import { Card, CardActionArea, CardContent, Typography, CardMedia } from '@material-ui/core'
import { useEffect, useState } from 'react';

function ScoreCards({ link }) {
    const [scoreData, setscoreData] = useState([])

    const getScores = () => {
        fetch(link)
            .then(response => response.json())
            .then(data => {
                const { categories } = data;
                setscoreData(categories)
            })
    }

    return (
        <div className="score__card">

        </div>
    )
}

export default ScoreCards
