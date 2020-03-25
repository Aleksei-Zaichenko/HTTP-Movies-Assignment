import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const {push} = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const editMovie = e =>{
    e.preventDefault();
    push(`/update-movie/${movie.id}`)
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className="buttons-on-movie-card">
        <div className='save-button' onClick={saveMovie}>
          Save
        </div>
        <div className='save-button' onClick={editMovie}>
          Edit
        </div>
      </div>
    </div>
  );
}

export default Movie;
