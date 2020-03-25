import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialInfo = {
    title: '',
    director: '',
    metascore: ''
  };

export const UpdateMovieInfo = ({movieList, setMovieList}) => {

    const {id} = useParams();
    const {push} = useHistory();

    const [movieInfo, setMovieInfo] = useState({initialInfo});

    const handleChange = ev => {
        ev.persist();
        let value = ev.target.value;

        if (ev.target.name === 'metascore') {
          value = parseInt(value, 10);
        }
    
        setMovieInfo({
          ...movieInfo,
          [ev.target.name]: value
        });
    };

    useEffect(()=>{
        const movieToUpdate = movieList.find(movie => `${movie.id}` === id)
        if(movieToUpdate){
            setMovieInfo(movieToUpdate);
        }
    }, [movieList, id]);

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movieInfo)
            .then(res => {
                const newMovieList = [...movieList.filter(movie => `${movie.id}` !== id)]
                newMovieList.unshift(res.data);
                setMovieList(newMovieList);
                push(`/movies/${id}`);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='update-form'>
            <h2>Edit the movie info</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={movieInfo.title}
                    placeholder="title"
                />
                <input 
                    type="text"
                    name="director"
                    onChange={handleChange}
                    value={movieInfo.director}
                    placeholder="director"
                />
                <input 
                    type="number"
                    name="metascore"
                    onChange={handleChange}
                    value={movieInfo.metascore}
                    placeholder="metascore"
                />
                <button type="submit">Submit changes</button>
            </form>
        </div>
    );
};