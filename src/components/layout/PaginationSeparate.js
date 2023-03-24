import * as React from 'react';
import { useEffect } from 'react';
import '../../App.css'
import { Pagination, withTheme } from '@mui/material';
import Stack from '@mui/material/Stack';

const PaginationSeparate = ({page,setPage,totalPages}) => {

    const handlePageChange = (page)=>{
        // console.log(trendingPage,"page trending");
        let pageInt = parseInt(page)
        setPage(pageInt)
        window.scrollTo(0, 0)
    }
return (
 <div className='d-flex justify-content-center my-5 text-white h1'>
 <Stack spacing={2}>
 <Pagination count={totalPages?totalPages:20} hidePrevButton hideNextButton variant="outlined" shape="rounded" page={page} color='primary'  onChange={(e)=>handlePageChange(e.target.textContent)}  />

</Stack>

 </div>
)
}

export default PaginationSeparate