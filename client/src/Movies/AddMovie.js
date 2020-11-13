import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: []
}

export const AddMovie = () => {
  const [ movie, setMovie ] = useState(initialMovie);
  const { push } = useHistory();

  const onChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    const newMovie = {...movie}
    newMovie.stars = newMovie.stars.split(', ')
    axios.post(`http://localhost:5000/api/movies`, newMovie)
      .then(() => push(''))
      .catch(err => console.log(err))
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <form onSubmit={onSubmit}>
        <h2>Add Movie</h2>
        <input 
          type='text'
          name='title'
          placeholder='Set Title'
          value={movie.title}
          onChange={onChange}
        /><br />
        <input 
          type='text'
          name='director'
          placeholder='Set Director'
          value={movie.director}
          onChange={onChange}
        /><br />
        <input 
          type='number'
          name='metascore'
          placeholder='Set Metascore'
          value={movie.metascore}
          onChange={onChange}
        /><br />
        <input 
          type='text'
          name='stars'
          placeholder='Set Stars'
          value={movie.stars}
          onChange={onChange}
        /><br />
        <button>Submit</button>
      </form>
    </div>
  )
}