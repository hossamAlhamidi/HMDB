import React ,{useState , useEffect} from 'react'
import * as config from './config/apiConfig'
import { useParams } from 'react-router'
import {useSelector} from 'react-redux';
import axios from 'axios'
import '../css/movieDetails.scss'
import imdb from '../assets/icons/imdb.svg'
import notAvailable from '../assets/icons/not.png'
import { useSelect } from '@mui/base'
import MovieCast from './MovieCast';
const MovieDetails = () => {
    const [movieDetails , setMovieDetails] = useState([]);
    const [videos,setVideos] = useState([]);
    const [watchlistExist , setWatchlistExist] = useState(false);
    const [copyText , setCopyText] = useState("")
    const websiteURL = `${config.url}/movie/`
    let trailer = "";
    let {movieId} = useParams();
    const base_img = "https://image.tmdb.org/t/p/w500/"
    const auth = useSelector((state)=>{
        return({auth:state.auth,email:state.email})
      })

    useEffect(()=>{
       window.scrollTo(0,0)
        axios.get(`${config.base_url}/movie/${movieId}?${config.api_key}&language=en-US`)
        .then((res)=>{
            // console.log(res.data,"det")
            setMovieDetails(res.data)
        }).catch((err)=>{
          
            console.log(err)
        })

        axios.get(`${config.base_url}/movie/${movieId}/videos?${config.api_key}&language=en-US&append_to_response=videos`)
        .then((res)=>{
            // console.log(res.data,"video");
            setVideos(res.data.results)
        }).catch((err)=>{

            console.log(err)
        })

        const url = `${config.url}/isWatchlist.php`
        const obj = {
            id:movieId,
            email:auth.email
          }
          axios.post(url,obj).then((res)=>{
            if(res.data=="yes"){
                // console.log("yes watchlist")
                setWatchlistExist(true)
            }
          }).catch((err)=>{
            console.log(err);
          })
    }
    
    ,[])

    // useEffect(()=>{

    // },[watchlistExist])


    const handleWatchlist = ()=>{
        const url = `${config.url}/insertWatchlist.php`
        const obj = {
            email:auth.email,
            movie:movieDetails}
        axios.post(url,obj).then((res)=>{
            setWatchlistExist(true);
            // console.log(res);
            if(res.data=="exist"){
                console.log("already there");
            }
            else if(res.data=="yes"){
                console.log("inserted");
            }
            else{
                alert("something went wrong")
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    const copyToClipboard = () => 
    { 
      setCopyText(websiteURL+movieId)
      navigator.clipboard.writeText(websiteURL+movieId)
    }
  
    // console.log(movieId);
    videos.map((e)=>{
        if(e.type.toLowerCase() == "trailer"){
            trailer = e.key;
        }
    })
    // console.log(movieDetails,"watch")
  return (
    <div className='page-min-height'>

    { movieDetails.title&&  <div className="movie_card" id="bright">
  <div className="info_section">
    
    <div className="movie_header">
        <div className='position-relative'>
      <img className="locandina"  src={movieDetails.poster_path != null ?(base_img+movieDetails.poster_path):notAvailable}/>
      { auth.auth&&<button onClick={handleWatchlist} className='wishlist border-0 ' data-bs-toggle="tooltip" data-bs-placement="right" title="Add to Watchlist ">
        {!watchlistExist?<i className='bi bi-bookmark-plus '></i>:<i className="bi bi-check"></i>}
        </button> }
      </div>
      <h3>{movieDetails.title}</h3>
      <h6 className=''>{movieDetails.release_date.split("-")[0]}</h6> 
      <span className="minutes">{movieDetails.runtime} min</span>
      <p className="type">{movieDetails.genres?.map((genre,i)=>{
        if(i<3)
        return(
            <span key={genre.id}>{genre.name}{i!=2 && i!=movieDetails.genres.length-1?",":null} </span>
        )
      })}
      
      </p>
    </div>
    <div>
    <div className="movie_desc">
      <p className="text">
      {movieDetails.overview}
      </p>
    </div>
    <div className="movie_social my-3 ">
      <ul className='mt-2 social d-flex align-items-center'>
        <li><span className='me-1' style={{color:"orange",fontWeight:"bold"}}>{movieDetails.vote_average.toFixed(1)}</span><i style={{color:"orange"}}className="fa fa-solid fa-star"></i></li>
        <li>
          <button className='btn border-0' onClick={copyToClipboard} >
          {
          !copyText?<i style={{color:"#cfd6e1",fontWeight:"bold"}} className="bi bi-share"></i>
          :<i style={{color:"#cfd6e1",fontWeight:"bold",fontSize:"1.5rem"}} className="bi bi-check2-circle"></i>
          }

          </button>
          </li>
        <li className='border border-light px-2 py-1'>
            <i className="bx bx-play text-light" style={{transform: "translateY(3px)"}}></i>
            <a className='text-light ' href={"https://www.youtube.com/watch?v="+trailer} target="_blank">Trailer</a>
        </li>
        <li className=' py-1 px-2'><a target="_blank" href={"https://m.imdb.com/title/"+movieDetails.imdb_id}><img src={imdb}/></a></li>
      </ul>
    </div>
    {/* here */}
    </div> 
  </div>
  <div className="blur_back bright_back" style={{background:`url(${movieDetails.poster_path != null ?(base_img+movieDetails.poster_path):notAvailable})`}}></div>
</div>

// :<h1 className='container text-center pt-5'>No result</h1>
}
  <MovieCast movieId={movieId}/>
    </div>
  )
}

export default MovieDetails