import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialValues = {
  title: '',
  director: '',
  metascore: '',
  stars: []
}

export const UpdateForm = ({movieList, setMovieList}) => {
  const [movie, setMovie] = useState(initialValues)
  const { push } = useHistory()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err))
  }, [id])

  const onChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        setMovieList(movieList.map(item => {
          if(item.id === res.data.id) {
            return res.data
          } else {
            return item
          }
        }))
        setMovie(initialValues)
        push('')
      })
    .catch(err => console.log(err))
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <form onSubmit={onSubmit}>
        <h2>Edit Movie</h2>
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
        {/* <input 
          type='text'
          name='stars'
          placeholder='Set Stars'
          value={movie.stars}
          onChange={onChange}
        /><br /> */}
        <button>Submit</button>
      </form>
    </div>
  )
}