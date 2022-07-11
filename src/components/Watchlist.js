import React ,{useState , useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import WatchlistCard from './layout/WatchlistCard';
const Watchlist = () => {
    const auth = useSelector((state)=>{
        return({auth:state.auth,email:state.email})
      })
      const [watchlist , setWatchlist] = useState([]);
      const [isLoading , setIsLoading] = useState(true);

      useEffect(()=>{
        const url = 'http://localhost/hosmdb/getWatchlist.php'
        const obj = {
            email:auth.email
          }
            
      auth.auth &&  axios.post(url,obj).then((res)=>{
            console.log(res.data,"watchlsit");
            setIsLoading(false);
            if(res.data=="no"){
                console.log("empty");
            }
            else{
                
               setWatchlist(res.data)
              
            }
        }).catch((err)=>{
           alert("No connection")
            console.log(err)
        })
      },[])

      console.log(isLoading,"isloading")
  return (
    <div className='page-min-height'>
      
        {
        !auth.auth?
        <div className='text-center pt-5'>
            <h5 className='text-muted'>Please Sign in to access this feature</h5>
            <Link to="/signin"><span className='btn  border-0' style={{backgroundColor:"#112D4E",color:"#DBE2EF"}}>Login</span></Link>
        </div>
        
        
        
        :isLoading? <div className="d-flex justify-content-center pt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
       : watchlist.length  >0?<WatchlistCard movies={watchlist}/>
      
          : <h4 className='text-center pt-5 my-5'>Your WatchList is empty</h4>
    }
    {/* {isLoading? <div className="d-flex justify-content-center pt-5">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>:  <h4 className='text-center pt-5 my-5'>Your WatchList is empty</h4>} */}
    </div>
  )
}

export default Watchlist