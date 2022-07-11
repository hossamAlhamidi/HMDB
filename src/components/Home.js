import React from 'react'
import '../App.css';
import { useState, useEffect , createContext } from 'react';
import axios from 'axios';
import {api_url} from './config/apiConfig';
import Card from './layout/Card';
import Footer from './layout/Footer';
import SwiperCategories from './SwiperCategories';
import PaginationMui from './layout/PaginationMui';
import PaginationSeparate from './layout/PaginationSeparate';
import {useSelector} from 'react-redux';
export const MovieContext = React.createContext();
const Home = () => {
    const [movies,setMovies] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);
    const [categoryPage , setCategoryPage] = useState(1);
    const [isLoading , setIsLoading] = useState(true);
    // const [auth , setAuth] = useState("");

     const auth = useSelector((state)=>{
      return({auth:state.auth,email:state.email})
    })
 
   
    useEffect(()=>{
      console.log("home");
      console.log(page)
        axios.get(`${api_url}&page=${page}`).then((res)=>{
          //  console.log(res.data,"data from home")
          setMovies(res.data.results)
          setIsLoading(false)
        }).catch((err)=>{
            console.log(err);
            alert("something went wrong")
        })
       },[page])
       
     
  return (
    <div className='page-min-height'>
   <MovieContext.Provider value={{movies:movies,setMovies:setMovies}}>
       <SwiperCategories  categoryPage={categoryPage} setCategoryPage={setCategoryPage}/>
     
    </MovieContext.Provider>
    {isLoading?<div className="d-flex justify-content-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>:
       <>
    <Card name="Discover" movies={movies}/>
    <PaginationMui page={page} setPage={setPage} categoryPage={categoryPage} setCategoryPage={setCategoryPage}/>
    {/* <PaginationSeparate page = {page} setPage={setPage}/> */}
       </>
  }
    </div>
  )
}

export default Home