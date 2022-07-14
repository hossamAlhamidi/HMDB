
import { BrowserRouter as Router ,Routes ,Route, useNavigate} from 'react-router-dom';
import './App.css';
import {useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar'
import Home from './components/Home';
import Trending from './components/Trending'
import TopRated from './components/TopRated';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Watchlist from './components/Watchlist';
import Hossamiyat from './components/Hossamiyat';
import Footer from './components/layout/Footer';
import NotFound from './components/NotFound';
function App() {
  const auth = useSelector((state)=>{
    return({auth:state.auth,email:state.email})
  })
  // const navigate = useNavigate();
  return (
    <div className="App">
      <Router>
    <Sidebar/>

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/trending' element={<Trending/>}/>
      <Route path='/topRated' element={<TopRated/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/hossamiyat' element={<Hossamiyat/>}/>
      <Route path='/movie/:movieId' element={<MovieDetails/>}/>
      {!auth.auth? 
      <>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      </>:null
      // <>
      // <Route path='/signin' element={<Home/>}/>
      // <Route path='/signup' element={<Home/>}/>
      // </>
      }
      <Route path='/watchlist' element={<Watchlist/>}/>
      <Route path='/*' element={<NotFound />} />
    </Routes>

    <Footer/>
      </Router>
    </div>
  );
}

export default App;
