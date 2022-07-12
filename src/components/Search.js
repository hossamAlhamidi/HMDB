import React ,{useState , useEffect} from 'react'
import '../css/search.css'
import axios from 'axios';
import * as config from '../components/config/apiConfig'
import Card from './layout/Card';
import PaginationSeparate from './layout/PaginationSeparate';
const Search = () => {
  const [search,setSearch] = useState("");
  const [movie,setMovie] = useState([]);
  const [page,setPage] = useState(1);
  const [totalPages , setTotalPages] = useState(1);
  const handleSearchChange = (input)=>{
    setSearch(input)
  }
  useEffect(()=>{
    if(search)
    axios.get(config.base_url+`/search/movie?${config.api_key}&query=${search}&page=${page}`).then((res)=>{
      // console.log(res.data,"search");
      setMovie(res.data.results)
      setTotalPages(res.data.total_pages)
    })
    .catch((err)=>{
      console.log(err)
      alert("something went wrong")
    })
  },[search,page])
  return (
    <div className='container pt-5 page-min-height'>
        <div className='row'>
            <div className=' col-md-6  mx-auto'>
                
                {/* <div className='form-group position-relative'>
                    <input className='form-control' name='search' id='search' placeholder='Type Your Movie Name'/>
                    <button type ='submit' className = 'btn btn-search'><i className="bi bi-search"></i></button>
                </div> */}
                <div className="group">
  <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
  <input placeholder="Search" type="search" className="input" value={search} onChange={(event)=>handleSearchChange(event.target.value)}/>
</div>
                

            </div>
              
        </div>

       { search && <>
        <Card movies={movie} name=""/>
        <PaginationSeparate page = {page} setPage={setPage} totalPages={totalPages} />
       
       </>
       }

    </div>
  )
}

export default Search