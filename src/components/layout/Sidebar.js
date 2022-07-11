import React ,{useEffect} from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux'
import { Navigate } from 'react-router-dom';
const Sidebar = () => {
  const auth = useSelector((state)=>{
    return({auth:state.auth,email:state.email})
  })
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    dispatch({type:"LOGOUT",payload:""});
    localStorage.removeItem("auth");
    localStorage.clear();
    navigate("/");
    window.location.reload()
  }
  useEffect(()=>{
    const showNavbar = (toggleId, navId, bodyId, headerId) =>{
       
        const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId)
     
        // Validate that all variables exist
        if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
            
        // show navbar
        nav.classList.toggle('show')
        // change icon
        toggle.classList.toggle('bx-x')
        // add padding to body
        bodypd.classList.toggle('body-pd')
        // add padding to header
        headerpd.classList.toggle('body-pd')
        })
        }
        }
        
        showNavbar('header-toggle','nav-bar','body-pd','header')
        
        /*===== LINK ACTIVE =====*/
        const linkColor = document.querySelectorAll('.nav_link')
        
        function colorLink(){
        if(linkColor){
        linkColor.forEach(l=> l.classList.remove('active'))
        this.classList.add('active')
        }
        }
        linkColor.forEach(l=> l.addEventListener('click', colorLink))
        
    
  },[])

  // console.log(authName,"authname")
  return (
    <div id="body-pd">
           {/* <Helmet>
              <script src="./include/sidebarScript.js" type="text/babel" />
            </Helmet> */}
<header className="header justify-content-start" id="header">
        <div className="header_toggle"> <i className='bx bx-menu ' id="header-toggle"></i> </div>
        
        <h4 className='m-auto header-name'>HosMDB</h4>
      {auth.auth==false?<Link to="/signin" className='btn log-btn '>Login</Link> :
      <button onClick={handleLogout} className='btn log-btn  bg-danger '>Logout</button> }  
       {/* <Link to="/signin" className='btn log-btn '>Login</Link> */}
        {/* <div className="header_img"> <img src="https://i.imgur.com/hczKIze.jpg" alt=""/> </div> */}
    </header>

    <div className="l-navbar" id="nav-bar">
        <nav className="nav">
            <div> 
                <a  className="nav_logo"> 
                <i className='bx bx-layer '></i>
                 <span className="nav_logo-name">HosMDB</span> </a>

                <div className="nav_list"> 
                <Link to="/"  className="nav_link  "> 
                <i className='bx bx-home nav-icon'></i>
                 <span className="nav_name">Home</span> 
                 </Link> 
                 
                 <Link to="/search"   className="nav_link" id="header-toggle"> 
                 <i className='bx bx-search nav_icon' ></i>
                  <span className="nav_name">Search</span> 
                  </Link> 
                  
                  <Link to="/trending" className="nav_link"> 
                  <i className='fa fa-solid fa-fire nav_icon'></i>
                   <span className="nav_name">Trending</span> 
                   </Link> 
                   
                   <Link to="/topRated" className="nav_link">
                     <i className='fa fa-regular fa-star nav_icon'></i>
                      <span className="nav_name">Top Rated</span> 
                      </Link> 

                   <Link to="/watchlist" className="nav_link"> 
                   <i className='bx bx-bookmark nav_icon'></i> 
                   <span className="nav_name">Watchlist</span> 
                   </Link> 
                   
                      
                      <Link to="hossamiyat" className="nav_link"> <i className='bi bi-hand-thumbs-up nav_icon'></i> <span className="nav_name">Hossamiyat</span> </Link> </div>
            </div> 
            {/* <a href="#" className="nav_link"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">SignOut</span> </a> */}
        </nav>
    </div>
    {/* <div className="height-100 bg-light">
        <h4>Main Components</h4>
    </div>
  */}
    </div>
  )
}

export default Sidebar