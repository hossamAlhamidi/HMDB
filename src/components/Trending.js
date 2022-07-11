import React ,{useState , useEffect , createContext} from 'react'
import axios from 'axios'
import * as config from './config/apiConfig';
import Card from './layout/Card';
import PaginationSeparate from './layout/PaginationSeparate'; 
// export const TrendingMoviesContext = React.createContext();
const Trending = () => {
  const [trendingMovies , setTrendingMovies] = useState([]);
  const [trendingPage , setTrendingPage] = useState(1);
  const [isLoading , setIsLoading] = useState(true);
  
  useEffect(()=>{
    console.log("trending");
    axios.get(`${config.base_url}/trending/movie/week?${config.api_key}&page=${trendingPage}`).
    then((res)=>{
      // console.log(res.data.results,"trending")
      setTrendingMovies(res.data.results);
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err)
    })
  },[trendingPage])

  
  return (
    <div className='page-min-height'>
      {/* <TrendingMoviesContext value={{movies:trendingMovies,setTrendingMovies:setTrendingMovies}}> */}
      {isLoading?<div className="d-flex justify-content-center pt-5">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>:
      <>
       <Card name="Trending" movies={trendingMovies} />
       <PaginationSeparate page = {trendingPage} setPage={setTrendingPage}/>
      </>

  }
      {/* </TrendingMoviesContext> */}
    </div>
  )
}

export default Trending