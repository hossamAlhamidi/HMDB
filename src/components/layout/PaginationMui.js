import * as React from 'react';
import { useEffect  } from 'react';
import '../../App.css'
import { Pagination, withTheme } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { fontSize } from '@mui/system';
import useEvent from 'react-use-event-hook';

const PaginationMui = ({page,setPage ,categoryPage,setCategoryPage}) => {

   
  // const handlePageChange = useEvent(
  //   (page)=>{
  //      console.log(page,"page");
  //          let pageInt = parseInt(page)
  //              setPage(page);
  //             setCategoryPage(pageInt) 
  //             // window.scrollTo(0, 0)
  //         }
  
  // );
      const handlePageChange = (page)=>{
          //  console.log(page,"page");
           let pageInt = parseInt(page)
            setPage(pageInt);
           setCategoryPage(pageInt) 
          //  window.scrollTo(0, 0)
    // change both pages and if he clicks category it will return pageCategory to 1 but page is the same because
    // he cant return unless he goes to another page then return;
       }
  return (
    <div className='d-flex justify-content-center my-5 text-white h1'>
    <Stack spacing={2}>
    <Pagination count={20} hidePrevButton hideNextButton variant="outlined" shape="rounded" page={categoryPage} color='primary'  onChange={(e)=>handlePageChange(e.target.textContent)}  />
    {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
  </Stack>

    </div>
  )
}

export default PaginationMui