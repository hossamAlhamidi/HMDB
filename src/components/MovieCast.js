import React,{useState,useEffect} from 'react'
import axios from 'axios'
import * as config from './config/apiConfig';
import notAvailable from '.././assets/icons/not.png'
import '../css/movieCast.css'
const MovieCast = ({movieId}) => {
    const [cast,setCast] = useState([]);
    const base_img = "https://image.tmdb.org/t/p/w500/"
    useEffect(()=>{
        axios.get(`${config.base_url}/movie/${movieId}/credits?${config.api_key}&language=en-US`)
        .then((res)=>{
            // console.log(res.data.cast,'cast')
            setCast(res.data.cast);
           
        }).catch((err)=>{
            console.log(err);
            alert("cast api not working")
        })
    },[])
  return (
    <div className='container my-3 px-3 px-sm-0 '>
         <h2>Cast</h2>
        <div className='grid-css'>
        {
            cast.map((actor,i)=>{
                if(i>=15){
                    return;
                }
                return(
                        
                        // <div className='col-3 col-sm-2 my-2' key={actor.cast_id}>
                        <div className='' key={actor.cast_id}>
                        <div className='text-center d-flex flex-column h-100'>
                            <div className='h-100'>
                            <img className='img-fluid h' style={{height:"169px"}} src={actor.profile_path !=null?base_img+actor.profile_path:notAvailable} />
                            </div>
                            <div className='text-center  h-100 pt-3'>
                            <h6 className=''>{actor.original_name}</h6>

                            </div>
                            </div>    
                        </div>
                        
                    
                )
            })
        }
        </div>
    </div>
  )
}

export default MovieCast