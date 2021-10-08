import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { addMovieToWatchLater } from '../actions'
import { removeMovieFromWatchLater } from '../actions'

const MovieCard = styled.section`
  position: relative;
  background-color: #00000099;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px #292929ec;
  border-radius: 10px;
  transition: all .2s;
  &:hover{
    transform: translateY(-20px);
  }
`

export const MainMovieCard = movie => {
  const [movieInWatchLater, setmovieInWatchLater] = useState(movie.watchLaterList.find(item => item.id === movie.movie.id))
  const [movieInWatched, setmovieInWatched] = useState(movie.watchedList.find(item => item.id === movie.movie.id))

  useEffect(() => {
    setmovieInWatchLater(movie.watchLaterList.find(item => item.id === movie.movie.id))
    setmovieInWatched(movie.watchedList.find(item => item.id === movie.movie.id))
  }, [movie])

  return (
    <MovieCard className="w-100 p-2 rounded">

      <NavLink to={`movie?id=${movie.movie.id}`}>
        <img alt={movie.movie.original_title} className="w-100 rounded mb-2" src={`https://image.tmdb.org/t/p/original${movie.movie.poster_path}`} />
      </NavLink>

      {movieInWatched
        ? <span className="btn btn-outline-success disabled mt-1 w-100">Watched</span>
        : <button onClick={
          () => movieInWatchLater ? movie.removeMovieFromWatchLater(movie.movie) : movie.addMovieToWatchLater(movie.movie)
        } className={`btn w-100 mt-1 ${movieInWatchLater ? "btn-outline-danger" : "btn-outline-light"}`} >
          {movieInWatchLater ? "Remove From Watch Later" : "Add to Watch Later"}
        </button>
      }

    </MovieCard>
  )
}


const mapStateToProps = state => {
  return {
    watchLaterList: state.watchLaterList,
    watchedList: state.watchedList
  }
}

export default connect(mapStateToProps, { removeMovieFromWatchLater, addMovieToWatchLater })(MainMovieCard);