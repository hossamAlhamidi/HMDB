import * as React from 'react';
import { useEffect  } from 'react';
import '../../App.css'
import { Pagination } from '@mui/material';

import Stack from '@mui/material/Stack';


const PaginationMui = ({page,setPage }) => {

   

      const handlePageChange = (page)=>{
          //  console.log(page,"page");
           let pageInt = parseInt(page)
            setPage(pageInt);
          //  setCategoryPage(pageInt) 
           window.scrollTo(0, 0)
    
       }
  return (
    <div className='d-flex justify-content-center my-5 text-white h1'>
    <Stack spacing={2}>
    <Pagination count={20} hidePrevButton hideNextButton variant="outlined" shape="rounded" page={page} color='primary'  onChange={(e)=>handlePageChange(e.target.textContent)}  />
    {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
  </Stack>

    </div>
  )
}

export default PaginationMui