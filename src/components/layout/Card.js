import React from 'react'
import { useContext } from 'react';
import '../../css/card.css';
import { MovieContext } from '../Home';
import { Link } from 'react-router-dom';
import notAvailable from '../../assets/icons/not.png'
const Card = ({name,movies}) => {

    const movieContext = useContext(MovieContext);
    // const {movies} = movieContext;
   
    const base_img = "https://image.tmdb.org/t/p/w500/"
    let color = "";
    let defaultImg = ""
  return (
   <div>
    <div className="container mt-5">
  <h2 className="text-center pt-5">{name} Movies</h2>
  <div className="row ">

   {movies.map((movie)=>{
    movie.vote_average>8? color ="#28a745": movie.vote_average > 5 ?color = "#ffc107":color="#dc3545";
  //  if(movie.poster_path == null){
  //   movie.poster_path = img;
  //  }
    return (
        <div className="col-md-4 col-lg-3 col-6" key={movie.id} >
   <div className="overlay"></div>
   <div className="card my-5" >
     <img src={movie.poster_path != null ?(base_img+movie.poster_path):notAvailable} className="card-img-top img-url img-card" alt="..."  />
     {/* <div className='img-url ' style={{background:`url(${base_img}${movie.poster_path})`}}></div> */}
     <h5 className="aps-title text-bold text-center">{movie.title}</h5>
       
       <div style={{border:`2px solid ${color}`,backgroundColor:color ,borderRadius:"4px 0 4px 4px"}} className=" rate  text-white   position-absolute">
        {movie.vote_average.toFixed(1)}</div>
       <div className=" aps-btn">
        <Link to={'/movie/'+movie.id}  className="btn expand-btn">
          {/* <i className="bi bi-arrows-fullscreen mx-2"></i> */}
          <span>Show</span></Link>
        </div>
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

export default Card