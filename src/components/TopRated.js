import React ,{useState , useEffect} from 'react'
import axios from 'axios';
import * as config from '../components/config/apiConfig'
import Card from './layout/Card';
import PaginationSeparate from './layout/PaginationSeparate';
const TopRated = () => {
    const [topRatedMovies , setTopRatedMovies] = useState([]);
    const [topRatedPage , setTopRatedPage] = useState(1);
    const [isLoading , setIsLoading] = useState(true);

    useEffect(()=>{
      window.scrollTo(0,0)
        axios.get(`${config.base_url}/movie/top_rated?${config.api_key}&page=${topRatedPage}`)
        .then((res)=>{
            setTopRatedMovies(res.data.results);
            setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
        })
    },[topRatedPage])
  return (
    <div className='page-min-height'>
         {isLoading?<div className="d-flex justify-content-center pt-5">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>:
        <>
         <Card name="Top Rated" movies={topRatedMovies} />
       <PaginationSeparate page = {topRatedPage} setPage={setTopRatedPage}/>
        </>

  }

    </div>
  )
}

export default TopRated