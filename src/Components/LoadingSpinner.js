import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingSpinner() {
    return (
        <div className="spinner">
            <CircularProgress />
        </div>
    )
}

export default LoadingSpinner
