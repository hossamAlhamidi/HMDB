import React from 'react'
import Card from './layout/Card'
const Hossamiyat = () => {
    const movies = 
    [
    {
        id:324786,
        vote_average:8.2,
        title:"Hacksaw Ridge",
        poster_path:"fTuxNlgEm04PPFkr1xfK94Jn8BW.jpg"
    },
    {
      id:1124,
      vote_average:8.2,
      title:"The Prestige",
      poster_path:"bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg"
    },
    {
      id:411088,
      vote_average:8.1,
      title:"The Invisible Guest",
      poster_path:"fptnZJbLzKUHeNlYrAynbyoL5YJ.jpg"
    },
    {
      id:"16869",
      vote_average:8.2,
      title:"Inglourious Basterds",
      poster_path:"7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg"
    }
]
  return (
    <div className='page-min-height'>
        <Card name="Hossamiyat" movies={movies} />
    </div>
  )
}

export default Hossamiyat