import React from 'react'
import { useContext } from 'react';
import '../../css/card.css';
import {useSelector , useDispatch} from 'react-redux';
import { MovieContext } from '../Home';
import { Link } from 'react-router-dom';
import axios from 'axios';
import notAvailable from '../../assets/icons/not.png'
import * as config from '../config/apiConfig'
const WatchlistCard = ({movies}) => {

    const auth = useSelector((state)=>{
        return({auth:state.auth,email:state.email})
      })
    
    const handleDeleteButton = (id)=>{
        const url = `${config.url}/deleteWatchlist.php`
        const obj = {
            id:id,
            email:auth.email
          }
          axios.post(url,obj).then((res)=>{
            if(res.data=="no"){
                alert("something went wrong");
            }
            else {
                console.log("deleted")
                window.location.reload();
            }
          }).catch((err)=>{
            console.log(err);
          })
    }
   
    const base_img = "https://image.tmdb.org/t/p/w500/"
    let color = "";
    let defaultImg = ""
  return (
   <div>
    <div className="container mt-5">
  <h2 className="text-center pt-5"> WatchList</h2>
  <div className="row ">

   {movies.map((movie)=>{
    movie.movie_rate>8? color ="#28a745": movie.movie_rate > 5 ?color = "#ffc107":color="#dc3545";
  //  if(movie.movie_poster == null){
  //   movie.movie_poster = img;
  //  }
    return (
        <div className="col-md-3 col-6" key={movie.movie_id} >
   <div className="overlay"></div>
   <div className="card my-5" style={{borderColor:"#dce2ee"}} >
     <img src={movie.movie_poster != "" ?(base_img+movie.movie_poster):notAvailable} className="card-img-top img-url img-card" alt="..."  />
     {/* <div className='img-url ' style={{background:`url(${base_img}${movie.movie_poster})`}}></div> */}
     <h5 className="aps-title text-bold text-center">{movie.movie_name}</h5>
       
       <div style={{border:`2px solid ${color}`,backgroundColor:color ,borderRadius:"4px 0 4px 4px"}} className=" rate  text-white   position-absolute">
        {movie.movie_rate}</div>
       <div className=" aps-btn">
        <Link to={'/movie/'+movie.movie_id}  className="btn expand-btn">
          {/* <i className="bi bi-arrows-fullscreen mx-2"></i> */}
          <span>Show</span></Link>
        </div>
        <div className='text-center' style={{backgroundColor:"#dce2ee"}}><button onClick={()=>handleDeleteButton(movie.movie_id)} style={{transform:"translateX(-50%)",zIndex:"10"}} className='btn btn-trash border-0 btn-lg text-danger position-absolute'><i className='bi bi-trash3'></i></button></div>
       {/* <button  type="button" className="btn btn-primary btn-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Show Details
  </button> */}
  
    
   </div>
   
 </div>
    )
   })}




    

  </div>

   
</div>

   </div>
  )
}

export default WatchlistCard