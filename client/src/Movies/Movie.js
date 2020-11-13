import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movieList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = () => {
    return push(`/update-movie/${params.id}`)
  }

  const deleteMovie = () => {
    const id = params.id
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(() => {
        setMovieList(movieList.filter(item => {
          return item.id !== id
        }))
        push('')
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div><br />
      <div className="save-button" style={{marginRight: '5rem'}} onClick={editMovie}>
        Edit
      </div><br />
      <div className="save-button" style={{marginRight: '9.5rem'}} onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
