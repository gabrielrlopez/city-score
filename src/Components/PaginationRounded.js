import React from 'react';
import { Pagination } from '@material-ui/lab';

function PaginationRounded({ postsPerPage, totalPosts, paginate, currentPage }) {
    let pageNumbers = Math.ceil(totalPosts / postsPerPage);

    const handleChange = (event, pageNumber) => {
        paginate(pageNumber)
    };

    return (
        <div>
            <Pagination count={pageNumbers} variant="outlined" shape="rounded" onChange={handleChange} page={currentPage} />
        </div>
    )
}

export default PaginationRounded
