import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { MovieContext } from './Home';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import {Swiper , SwiperSlide } from 'swiper/react';
import { api_url , base_url , api_key } from './config/apiConfig';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Action from '../assets/icons/spy.png'
import Romance from '../assets/icons/romance.png'
import Crime from '../assets/icons/crime1.png'
import Family from '../assets/icons/family.png'
import Drama from '../assets/icons/drama.png'
import Comedy from '../assets/icons/comedy.png'
import War from '../assets/icons/war.png'
import Horror from '../assets/icons/horror.png'
import Mystery from '../assets/icons/crime1.png'
const SwiperCategories = ({categoryPage,setCategoryPage}) => {
 const icons = {
    Action:Action,
    Romance:Romance,
    Crime:Crime,
    Family:Family,
    Drama:Drama,
    Comedy:Comedy,
    War:War,
    Horror:Horror,
    Mystery:Mystery
 }
    const movieContext = useContext(MovieContext);
    const {movies , setMovies} = movieContext;
    const [categories , setCategories] = useState([]);
    // const [categoryPage , setCategoryPage] = useState(1);
    const [genreId,setGenreId] = useState(1);
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?${api_key}&language=en-US`)
        .then((res)=>{
       
            setCategories(res.data.genres)
             setCategoryPage(1);
            
        }).catch((err)=>{
            console.log(err)
        })
    },[genreId])

       useEffect(()=>{
        movieByCategory(genreId);
       },[categoryPage])

    const movieByCategory = (id)=>{
        setGenreId(id);
        // console.log(categoryPage,'catergoryPage');
        //  setPage(1);
        // console.log(page,"page")
        axios.get(`${base_url}/discover/movie?${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${categoryPage}&with_genres=${id}`).then((res)=>{
           setMovies(res.data.results)
           
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className='container-md px-md-5 py-5 my-5'>

        <Swiper 
         modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20} 
        
        navigation
        
      
        grabCursor={true}
        breakpoints={{320:{
            width:320,
            slidesPerView:2
        },
        720:{
            width:920,
            slidesPerView:4
        }
    
    }}
        >
                        {/* <Swiper
                breakpoints={{
                    // when window width is >= 640px
                    320: {
                    width: 320,
                    slidesPerView: 3,
                    spaceBetween:20
                    },
                    // when window width is >= 768px
                    768: {
                    width: 768,
                    slidesPerView: 6,
                    spaceBetween:20
                    },
                }}
                > */}
               

        {categories.map((e,i)=>{
           

            if(i==1 || i==2 || i==5 || i==8 || i==9 || i==11 || i==14 || i==15|| i==16 || i==18  ){
                return;
            }
            else {
            return (
                <SwiperSlide  id={e.id}key={e.id}>
                 <div className='card card-bg' style={{cursor:"pointer"}} onClick={()=>movieByCategory(e.id)}  >
                <div className='card-body  mx-auto text-center'>
                <div><img src={icons[e.name]} style={{width:"60px",height:"60px"}}/></div>
                <h5 className='mt-3 category-name'>{e.name}</h5>
                </div>
                </div>
            </SwiperSlide>
           
            )
            }
        })}
    
        

      

        </Swiper>
    </div>
  )
}

export default SwiperCategories